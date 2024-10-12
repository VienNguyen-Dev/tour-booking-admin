"use server";

async function handleSuccessfulPayment(productId: string, customerEmail: string) {
  const eVoucher = "DEV2024";
  try {
    await sendEmail({
      to: customerEmail,
      subject: "Your E-Voucher is ready!",
      text: `Thank you for your purchase! Here is your E-Voucher: ${eVoucher}`,
    });

    await sendNotificationToApp(customerEmail, "Your E-Voucher is ready!");
  } catch (error) {
    console.log("Error while sent e voucher", error);
  }
}
async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  // Sử dụng một dịch vụ email để gửi email (ví dụ: Nodemailer, SendGrid)
}

async function sendNotificationToApp(userEmail: string, message: string) {
  // Sử dụng Firebase hoặc Push Notification để gửi thông báo
}
