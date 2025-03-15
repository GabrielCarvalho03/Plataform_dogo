import { preaApproval } from "@/services/mercado-pago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const clientSecret = req.headers.get("x-client-secret");
  const userAgent = req.headers.get("user-agent");

  console.log("clientSecret", clientSecret);

  if (clientSecret !== process.env.NEXT_PUBLIC_MP_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Acesso não autorizado" },
      { status: 403 }
    );
  }

  console.log("body", body);

  try {
    const subscription = await preaApproval.create({
      body: {
        payer_email: body.email,
        reason: "Assinatura",
        auto_recurring: {
          frequency: 1, // Ex: 1
          frequency_type: "months",
          transaction_amount: Number(body.amount),
          currency_id: "BRL",
        },
        external_reference: JSON.stringify({
          userId: body.userId,
          uuid: body.uuid,
          plano: body.plano,
          alunos: body.students_amount,
        }),
        back_url: `https://a9ea-2804-6cac-8141-f8ff-6951-e253-3a6b-9b6e.ngrok-free.app/success/${body.countAlunos}`,
      },
    });

    console.log("subscription", subscription.init_point);

    return new NextResponse(JSON.stringify(subscription.init_point), {
      status: 200,
    });
  } catch (error) {
    console.log("❕❌ não foi possivel criar assinatura", error);
  }
}
