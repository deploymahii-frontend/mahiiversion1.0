import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default async function downloadInvoice() {

    const invoice =
        document.getElementById("invoice");

    if (!invoice) return;

    const canvas =
        await html2canvas(invoice);

    const image =
        canvas.toDataURL("image/png");

    const pdf =
        new jsPDF();

    const width =
        pdf.internal.pageSize.getWidth();

    const height =
        (canvas.height * width) /
        canvas.width;

    pdf.addImage(

        image,

        "PNG",

        0,

        0,

        width,

        height

    );

    pdf.save("invoice.pdf");

}
