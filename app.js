// console.log("Hii");

// const input = document.getElementById("fileInput");
const btn = document.getElementById("btn");

// const fetchData = async (body) => {
//   console.log(body);
//   const res_data = await fetch("http://localhost:5000/users/me/upload", {
//     method: "post",
//     headers: {
//       "Content-type": "application/json",
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBkY2ExNDAyNmYwY2EzOWNkMTJlMCIsImlhdCI6MTY3NTc0NDM2Nn0.9bb5HlbGAr4qq4WiAXj3vPH7ZJtpTlniOjuf5KzTBI4",
//     },
//     body: JSON.stringify(body),
//   });

//   const res = await res_data.json();
//   console.log(res);
// };

btn.addEventListener("click", async () => {
  let photo = document.getElementById("fileInput").files[0];
  let formData = new FormData();
  formData.append("upload", photo);

  console.log(
    formData.forEach((ele) => console.log(ele)),
    typeof formData
  );

  const res_data = await fetch("http://localhost:5000/users/me/upload", {
    method: "POST",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBkY2ExNDAyNmYwY2EzOWNkMTJlMCIsImlhdCI6MTY3NTc0NDM2Nn0.9bb5HlbGAr4qq4WiAXj3vPH7ZJtpTlniOjuf5KzTBI4",
    },
    body: formData,
  });
  
  const res = await res_data.blob();
  console.log(res);
  var a = document.createElement("a");
  a.href = window.URL.createObjectURL(res);
  a.download = "FILENAME.csv";
  a.click();
});
