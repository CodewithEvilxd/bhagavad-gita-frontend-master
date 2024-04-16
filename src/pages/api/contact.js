const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-west-2",
});

// Load AWS SES
const ses = new aws.SES({ apiVersion: "2010-12-01" });
const to = [process.env.AWS_SES_CONTACT_EMAIL];
const from = process.env.AWS_SES_CONTACT_EMAIL;

export default (req, res) => {
  const body = req.body;

  ses.sendEmail(
    {
      Source: from,
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Data: `Contact form submission`,
        },
        Body: {
          Text: {
            Data: `
                    Name: ${body.name}
                    Email: ${body.email}
                    Message: ${body.message}
                  `,
          },
        },
      },
    },
    (err, data) => {
      if (err) {
        res.send({ status: "error" });
      } else {
        res.send({ status: "success" });
      }
    }
  );
};
