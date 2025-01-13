import { useState } from "react"


export const QRcode = () => {
    const [img ,setimg]=useState("")
    const [qrdata,setqrdata]=useState("")
    const [size,setsize]=useState("")
    const [loading,setloading]=useState(false)
   
    function generate(){ 
        if(qrdata==="" || size===""){
        alert("enter the text for generating QR code")
    }
    else{
        setloading(true)
        try{
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`
           setimg(url);

        }catch(error)
        {
          console.log("error is occures "+error);
          
        }finally{
            setloading(false)
        }
        
    }}
    function download(){
        if(img===""){
            alert("first enter the detail")
        }else{
            fetch(img)
.then((response) => response.blob())
.then((blob) => {
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "qrcode.png";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
});
        }
        
}
  return (
   <div className="QRmain">
   <h1>QR CODE GENERATOR</h1>
    {img && <img src={img}  /> }
    {loading && <p>Please wait....</p>}
    <div className="detail">
        <label htmlFor="inp1">QRcode URL</label>
        <input type="text" id="inp1"  className="inp1" placeholder="Enter the URL" onChange={(e)=>setqrdata(e.target.value)}/><br />
        <label htmlFor="inp2">Image size</label>
        <input type="text" id="inp2"  className="inp2" placeholder="Enter the size" onChange={(e)=>setsize(e.target.value)}/><br />
        <button className="bu1" onClick={generate} disabled={loading}>Generate QRcode</button>
        <button className="bu2" onClick={download}>Download Image</button>
    </div>

   </div>
  )
}
