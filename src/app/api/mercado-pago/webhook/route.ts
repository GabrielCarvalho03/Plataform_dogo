import { db } from "@/services/firebase-admin";
import { mercadoPago } from "@/services/mercado-pago";
import { PreApproval } from "mercadopago"; // Classe para gerenciar pré-aprovações
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📢 Recebendo Webhook:", body);

    // 📌 Verifica se a notificação é de uma assinatura (preapproval)
    if (body.type === "subscription_preapproval" && body.data.id) {
      const subscriptionId = body.data.id; // ID da assinatura
      if (!subscriptionId) {
        console.error("❌ subscriptionId não encontrado no webhook");
        return new NextResponse("ID da assinatura não encontrado", {
          status: 400,
        });
      }
      const preApproval = new PreApproval(mercadoPago);
      const preApprovalData = await preApproval.get({ id: subscriptionId });

      // console.log("🔍 Dados da pré-aprovação:", preApprovalData);

      console.log(
        "preApprovalData",
        //@ts-ignore
        JSON.parse(preApprovalData.external_reference)
      );

      let reference;
      try {
        if (preApprovalData.external_reference) {
          reference = JSON.parse(preApprovalData.external_reference);
        }
      } catch (error) {
        console.error("⚠️ Erro ao converter external_reference:", error);
      }

      if (!reference?.uuid) {
        console.error("❌ UUID não encontrado no external_reference");
        return new NextResponse("UUID não encontrado", { status: 400 });
      }

      if (preApprovalData.status === "authorized") {
        try {
          // 🔍 Buscar o usuário no Firestore pelo UUID
          const findUser = await db
            .collection("teacher_users")
            .where("uuid", "==", reference.uuid)
            .get();

          if (findUser.empty) {
            console.error(
              "❌ Usuário não encontrado com UUID:",
              reference.uuid
            );
            return new NextResponse("Usuário não encontrado", { status: 404 });
          }

          const userID = findUser.docs[0].id;

          // 🔥 Atualizar os dados do usuário no Firestore
          await db
            .collection("teacher_users")
            .doc(userID)
            .update({
              studentsAmount: reference.alunos,
              status_pagamento: "ativo",
              last_payment: moment()
                .add(1, "month")
                .format("YYYY-MM-DDTHH:mm:ssZ"),
            });

          console.log(
            "✅ Assinatura aprovada e usuário atualizado com sucesso!"
          );
        } catch (err) {
          console.error("❌ Erro ao salvar no Firestore:", err);
          return new NextResponse("Erro no banco de dados", { status: 500 });
        }
      } else {
        console.log(
          "⚠️ Pré-aprovação não aprovada. Status:",
          preApprovalData.status
        );
      }
    } else {
      console.log("❌ Tipo de evento desconhecido:", body.type);
    }

    // 📌 Responder com status 200 para confirmar o recebimento
    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    console.error("❌ Erro no webhook:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
