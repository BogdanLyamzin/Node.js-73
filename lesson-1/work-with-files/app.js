// import fs from "fs";
import fs from "fs/promises";

const func = async()=> {
    const filePath = "./files/file.txt";
    // const buffer = await fs.readFile(filePath);
    // const text = buffer.toString();
    // console.log(text);
    // const text = await fs.readFile(filePath, "utf-8");
    // console.log(text);
    // await fs.appendFile(filePath, "\nPython forever!");
    // await fs.writeFile(filePath, "PHP never die!")
    // await fs.appendFile("./files/file2.txt", "\nPython forever!");
    // await fs.writeFile("./files/file3.txt", "PHP never die!")
    // await fs.unlink("./files/file3.txt");
}

func()

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })