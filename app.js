
      const express = require("express");
      const bodyParser = require("body-parser");
      const nodemailer = require("nodemailer");
      const app = express();

      // تمكين معالج body-parser لفهم بيانات النموذج
      app.use(bodyParser.urlencoded({ extended: false }));

      // عرض النموذج
      app.get("/", (req, res) => {
        res.send(`
    <!-- النموذج هنا -->
  `);
      });

      // معالج استقبال البيانات من النموذج وإرسالها عبر البريد الإلكتروني
      app.post("/submit", (req, res) => {
        const name = req.body.name;
        const rate = req.body.rate;
        const email = req.body._replyto;
        const message = req.body.message;

        // إعداد معلومات البريد الإلكتروني والمرسل
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "ahmedarb867@gmail.com", // استبدل بعنوان البريد الإلكتروني الخاص بك
            pass: "Ahmed446002@", // استبدل بكلمة مرور البريد الإلكتروني الخاصة بك
          },
        });

        // تكوين البريد الإلكتروني
        const mailOptions = {
          from: "ahmedarb867@gmail.com", // استبدل بعنوان البريد الإلكتروني الخاص بك
          to: "ahmedarb867@gmail.com", // استبدل بعنوان البريد الإلكتروني الذي تريد إرسال البيانات إليه
          subject: "New Feedback",
          text: `
      Name: ${name}
      Rate: ${rate}
      Email: ${email}
      Message: ${message}
    `,
        };

        // إرسال البريد الإلكتروني
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.send("Oops! Something went wrong.");
          } else {
            console.log("Email sent: " + info.response);
            res.send("Thank you for your message!");
          }
        });
      });

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`الخادم يعمل على المنفذ ${PORT}`);
      });
