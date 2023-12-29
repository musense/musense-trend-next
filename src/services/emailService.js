import emailjs from '@emailjs/browser';

export default function sendEmail(
  { companyName, name, phone, email, askString, ask }
) {
  const emailProps = {
    service_key: process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY,
    template_key: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY,
    public_key: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  };
  console.log("🚀 ~ file: emailService.js:38 ~ emailProps:", emailProps)

  return new Promise((resolve, reject) => {

    let err = "";
    if (companyName === "") err += "「公司/品牌名稱」必填！\n"
    if (name === "") err += "「聯絡人」必填！\n"
    if (phone === "") err += "「電話」必填！\n"
    if (email === "") err += "「E-mail」必填！\n"
    if (askString === "" && ask === "") (err += "「合作需求」與「其他需求」請擇一填寫！\n")

    if (err !== "") return reject(err)
    const templateParams = {
      date: new Date().toLocaleDateString('zh-tw').replace(/\//g, ''),
      companyName,
      name,
      phone,
      email,
      askString,
      ask,
    };

    return emailjs
      .send(
        emailProps.service_key,
        emailProps.template_key,
        templateParams,
        emailProps.public_key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          resolve(response.text);
        },
        (err) => {
          console.log('FAILED...', err);
          reject(err);
        }
      );
  })
}

function sendEmail_test(
  { companyName, name, phone, email, askString, ask },
  { service_key, template_key, public_key }
) {
  console.log("🚀 ~ file: emailService.js:82 ~ ask:", ask)
  console.log("🚀 ~ file: emailService.js:82 ~ askString:", askString)
  console.log("🚀 ~ file: emailService.js:86 ~ service_key:", service_key)
  console.log("🚀 ~ file: emailService.js:86 ~ template_key:", template_key)
  console.log("🚀 ~ file: emailService.js:86 ~ public_key:", public_key)

  return new Promise((resolve, reject) => {

    let err = "";
    if (companyName === "") err += "「公司/品牌名稱」必填！\n"
    if (name === "") err += "「聯絡人」必填！\n"
    if (phone === "") err += "「電話」必填！\n"
    if (email === "") err += "「E-mail」必填！\n"
    if (askString === "" && ask === "") (err += "「合作需求」與「其他需求」請擇一填寫！\n")

    if (err !== "") return reject(err)
    const templateParams = {
      date: new Date().toLocaleDateString('zh-tw'),
      companyName,
      name,
      phone,
      email,
      askString,
      ask,
    };

    console.log("🚀 ~ file: emailService.js:62 ~ return new Promise ~ templateParams:", templateParams)

    return resolve("success")
  })
}


