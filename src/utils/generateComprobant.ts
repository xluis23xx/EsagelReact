import jsPDF from "jspdf";
import { DocumentType } from "../hooks/useDocuments";
import { OrderDetail } from "../hooks/useOrders";

  type GeneratePDFProps = {
    fontFamily?: string,
    dateOfIssue?: string,
    comprobantNumber?: string,
    clientName?: string,
    ruc?: string,
    establishment?: string,
    typeOfCurrency?: string,
    observation?: string,
    paymentMethod?: string,
    subtotal?: string,
    symbolOfCurrency?: string,
    igv?: string,
    documentType?: DocumentType | null,
    total?:string,
    isAnnulled?: boolean,
    ordersLines?: OrderDetail[]
  }

  export const generatePDF = ({
      fontFamily="Helvetica",
      dateOfIssue="",
      comprobantNumber="B001-00000000",
      clientName="Anónimo",
      ruc="-",
      establishment="-",
      typeOfCurrency="SOLES",
      observation="-",
      paymentMethod="Contado",
      subtotal="0.00",
      symbolOfCurrency="S/",
      igv="0.00",
      total="0.00",
      documentType,
      isAnnulled= false,
      ordersLines=[]
    }: GeneratePDFProps) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [10, 10],
    });

    // Estilo general
    doc.setFont(fontFamily, "", "Bold");

    // CABECERA

    // tamaño de letra
    doc.setFontSize(12);

    // estilos para primera linea
    doc.text("ESCUELA DE ADMINISTRACION Y GESTION LABORAL S.A.C", 0.5, 0.75);

    // lineas primera fila parte derecha
    doc.line(7, 0.4, 7, 1.3, "F");
    doc.line(9.5, 0.4, 9.5, 1.3, "F");
    doc.line(7, 0.4, 9.5, 0.4, "F");
    doc.line(7, 1.3, 9.5, 1.3, "F");

    if(documentType?.name==="Factura"){
        doc.text("           FACTURA ELECTRÓNICA", 6.7, 0.7);
    }else if(documentType?.name==="Boleta"){
        doc.text("            BOLETA ELECTRÓNICA", 6.7, 0.7);
    }else{
        doc.text("            VENTA ELECTRÓNICA", 6.7, 0.7);
    }
    if(ruc){
        doc.text(`RUC: ${ruc}`, 7.5, 0.9);
    }
    doc.text(`${comprobantNumber}`, 7.6, 1.1);

    // segunda linea
    doc.text("CAL. DIEGO DE ALMAGRO 226 TRUJILLO INT. 301A", 0.5, 0.95);

    // tercera linea
    doc.text("TRUJILLO - TRUJILLO - LA LIBERTAD", 0.5, 1.15);

    // linea de corte
    doc.line(0.4, 1.4, 9.6, 1.4, "F");

    // SUBCABECERA
    doc.setFont(fontFamily, "", "");
    // tamaño de letra
    const initialXSubheader = 0.5;
    const initialYSubheader = 1.6;
    doc.setFontSize(10);

    // campos
    doc.text("Fecha de Emisión", initialXSubheader, initialYSubheader);
    doc.text("Señor(es)", initialXSubheader, initialYSubheader + 0.2);
    doc.text("RUC", initialXSubheader, initialYSubheader + 0.4);
    doc.text("Establecimiento del Emisor", initialXSubheader, initialYSubheader + 0.6);
    doc.text("Tipo de moneda", initialXSubheader, initialYSubheader + 0.8);
    doc.text("Observación", initialXSubheader, initialYSubheader + 1);

    // valores
    doc.setFont(fontFamily, "", "Bold");
    doc.text(`: ${dateOfIssue}`, initialXSubheader+2.5, initialYSubheader);
    doc.text(`: ${clientName}`,  initialXSubheader+2.5, initialYSubheader + 0.2);
    doc.text(`: ${ruc}`,  initialXSubheader+2.5, initialYSubheader + 0.4);
    doc.text(`: ${establishment}`,  initialXSubheader+2.5, initialYSubheader + 0.6);
    doc.text(`: ${typeOfCurrency.toUpperCase()}`,  initialXSubheader+2.5, initialYSubheader + 0.8);
    doc.text(`: ${observation}`,  initialXSubheader+2.5, initialYSubheader + 1);

    // forma de pago
    doc.setFontSize(9);
    doc.text(`Forma de pago: ${paymentMethod}`, 7, initialYSubheader);

    // Fue anulada
    doc.setFontSize(14);
    if(isAnnulled){
      doc.line(6.8,initialYSubheader+0.4, 8.6, initialYSubheader+0.4,"F")
      doc.line(6.8,initialYSubheader+0.4, 6.8, initialYSubheader+0.8,"F")
      doc.text('ANULADA', 7.2, initialYSubheader+0.7)
      doc.line(8.6,initialYSubheader+0.4, 8.6, initialYSubheader+0.8,"F")
      doc.line(6.8,initialYSubheader+0.8, 8.6, initialYSubheader+0.8,"F")
    }

    // CUERPO DE ELEMENTOS
    doc.setFontSize(10.5);
    let initialYBodyLeft= 2.8
    doc.line(0.4, initialYBodyLeft, 9.6, initialYBodyLeft, "F");
    doc.line(0.4, initialYBodyLeft, 0.4, initialYBodyLeft+0.5, "F");
    doc.line(9.6, initialYBodyLeft, 9.6, initialYBodyLeft+0.5, "F");

    doc.text("Cantidad", 0.7, initialYBodyLeft+ 0.3)
    doc.text("Unidad Medida", 1.8, initialYBodyLeft+ 0.3)
    doc.text("Descripción", 3.2, initialYBodyLeft+ 0.3)
    doc.text("Valor Unitario", 7.05, initialYBodyLeft+ 0.3)
    doc.text("Descuento", 8.5, initialYBodyLeft+ 0.3)

    // lineas inferiores 
    doc.line(0.5, initialYBodyLeft+0.5, 1.5, initialYBodyLeft + 0.5, "F");
    doc.line(1.6, initialYBodyLeft+0.5, 3.0, initialYBodyLeft + 0.5, "F");
    doc.line(3.1, initialYBodyLeft+0.5, 6.8, initialYBodyLeft + 0.5, "F");
    doc.line(6.9, initialYBodyLeft+0.5, 8.2, initialYBodyLeft + 0.5, "F");
    doc.line(8.3, initialYBodyLeft+0.5, 9.5, initialYBodyLeft + 0.5, "F");

    initialYBodyLeft=initialYBodyLeft+0.5

    ordersLines?.map((order)=>{
    const {quantity=0, course= null, price=0, discount=0} =order || {}
      doc.text(quantity?.toFixed(2), 0.6, initialYBodyLeft+0.2);
      doc.text("UNIDAD", 1.9, initialYBodyLeft+0.2);
      doc.text(course?.name?.toUpperCase() || '', 3.3, initialYBodyLeft+0.2);
      doc.text(price?.toFixed(2), 7.15, initialYBodyLeft+0.2);
      doc.text(discount?.toFixed(2), 8.6, initialYBodyLeft+0.2);
      
      doc.line(0.4, initialYBodyLeft+0.5, 9.6, initialYBodyLeft+0.5, "F");
      doc.line(0.4, initialYBodyLeft, 0.4, initialYBodyLeft+0.5, "F");
      doc.line(9.6, initialYBodyLeft, 9.6, initialYBodyLeft+0.5, "F");
      initialYBodyLeft = initialYBodyLeft+0.5
    })
    
    // PARTE INFERIOR
    initialYBodyLeft = initialYBodyLeft+0.1
    doc.setFont(fontFamily, "", "");
    doc.setFontSize(10.4);

    // lineas cuadrado de la derecha
    doc.line(5, initialYBodyLeft, 9.5, initialYBodyLeft, "F");
    doc.line(5, initialYBodyLeft, 5, initialYBodyLeft+3.2, "F");
    doc.line(9.5, initialYBodyLeft, 9.5, initialYBodyLeft+3.2, "F");
    doc.line(5, initialYBodyLeft+3.2, 9.5, initialYBodyLeft+3.2, "F");
    
    // contenido de la parte izquierda
    doc.setFontSize(11);
    let initialYDescriptionLeft = initialYBodyLeft+1.5
    doc.text("Valor de venta de operaciones gratuitas",0.5,initialYDescriptionLeft)
    doc.text(`:      ${symbolOfCurrency} 0.00`, 3.225, initialYDescriptionLeft)
    doc.line(3.3, initialYDescriptionLeft-0.15,4.9, initialYDescriptionLeft-0.15,"F")
    doc.line(3.3, initialYDescriptionLeft-0.15,3.3, initialYDescriptionLeft+0.05, "F")
    doc.line(4.9, initialYDescriptionLeft-0.15,4.9, initialYDescriptionLeft+0.05, "F")
    doc.line(3.3, initialYDescriptionLeft+0.05,4.9, initialYDescriptionLeft+0.05, "F")

    // contenido del cuadrado de la derecha
    doc.setFontSize(10.4);
    let initialYDescriptionRight = initialYBodyLeft+0.3
    doc.text("Sub Total Ventas", 5.6, initialYDescriptionRight)
    doc.text("Anticipos", 5.6, initialYDescriptionRight+0.3)
    doc.text("Valor Venta", 5.6, initialYDescriptionRight+0.6)
    doc.text("ISC", 5.6, initialYDescriptionRight+0.9)
    doc.text("IGV", 5.6, initialYDescriptionRight+1.2)
    doc.text("ICBPER", 5.6, initialYDescriptionRight+1.5)
    doc.text("Otros Cargos", 5.6, initialYDescriptionRight+1.8)
    doc.text("Otros Atributos", 5.6, initialYDescriptionRight+2.1)
    doc.text("Monto de Redondeo", 5.6, initialYDescriptionRight+2.4)
    doc.text("Importe Total", 5.6, initialYDescriptionRight+2.7)

    // valores al contenido de la derecha
    doc.text(`:       ${symbolOfCurrency} ${subtotal}`, 7, initialYDescriptionRight)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+0.3)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+0.6)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+0.9)
    doc.text(`:       ${symbolOfCurrency} ${igv}`, 7, initialYDescriptionRight+1.2)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+1.5)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+1.8)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+2.1)
    doc.text(`:       ${symbolOfCurrency} 0.00`, 7, initialYDescriptionRight+2.4)
    doc.text(`:       ${symbolOfCurrency} ${total}`, 7, initialYDescriptionRight+2.7)

    // lineas de valor del contenido de la derecha
    doc.line(7.2, initialYDescriptionRight-0.15,9.4, initialYDescriptionRight-0.15,"F")
    doc.line(7.2, initialYDescriptionRight-0.15,7.2, initialYDescriptionRight+0.05, "F")
    doc.line(9.4, initialYDescriptionRight-0.15,9.4, initialYDescriptionRight+0.05, "F")
    doc.line(7.2, initialYDescriptionRight+0.05,9.4, initialYDescriptionRight+0.05, "F")

    doc.line(7.2, initialYDescriptionRight+0.15,9.4, initialYDescriptionRight+0.15,"F")
    doc.line(7.2, initialYDescriptionRight+0.15,7.2, initialYDescriptionRight+0.35, "F")
    doc.line(9.4, initialYDescriptionRight+0.15,9.4, initialYDescriptionRight+0.35, "F")
    doc.line(7.2, initialYDescriptionRight+0.35,9.4, initialYDescriptionRight+0.35, "F")

    doc.line(7.2, initialYDescriptionRight+0.45,9.4, initialYDescriptionRight+0.45,"F")
    doc.line(7.2, initialYDescriptionRight+0.45,7.2, initialYDescriptionRight+0.65, "F")
    doc.line(9.4, initialYDescriptionRight+0.45,9.4, initialYDescriptionRight+0.65, "F")
    doc.line(7.2, initialYDescriptionRight+0.65,9.4, initialYDescriptionRight+0.65, "F")

    doc.line(7.2, initialYDescriptionRight+0.75,9.4, initialYDescriptionRight+0.75,"F")
    doc.line(7.2, initialYDescriptionRight+0.75,7.2, initialYDescriptionRight+0.95, "F")
    doc.line(9.4, initialYDescriptionRight+0.75,9.4, initialYDescriptionRight+0.95, "F")
    doc.line(7.2, initialYDescriptionRight+0.95,9.4, initialYDescriptionRight+0.95, "F")

    doc.line(7.2, initialYDescriptionRight+1.05,9.4, initialYDescriptionRight+1.05,"F")
    doc.line(7.2, initialYDescriptionRight+1.05,7.2, initialYDescriptionRight+1.25, "F")
    doc.line(9.4, initialYDescriptionRight+1.05,9.4, initialYDescriptionRight+1.25, "F")
    doc.line(7.2, initialYDescriptionRight+1.25,9.4, initialYDescriptionRight+1.25, "F")

    doc.line(7.2, initialYDescriptionRight+1.35,9.4, initialYDescriptionRight+1.35,"F")
    doc.line(7.2, initialYDescriptionRight+1.35,7.2, initialYDescriptionRight+1.55, "F")
    doc.line(9.4, initialYDescriptionRight+1.35,9.4, initialYDescriptionRight+1.55, "F")
    doc.line(7.2, initialYDescriptionRight+1.55,9.4, initialYDescriptionRight+1.55, "F")

    doc.line(7.2, initialYDescriptionRight+1.65,9.4, initialYDescriptionRight+1.65,"F")
    doc.line(7.2, initialYDescriptionRight+1.65,7.2, initialYDescriptionRight+1.85, "F")
    doc.line(9.4, initialYDescriptionRight+1.65,9.4, initialYDescriptionRight+1.85, "F")
    doc.line(7.2, initialYDescriptionRight+1.85,9.4, initialYDescriptionRight+1.85, "F")
    
    doc.line(7.2, initialYDescriptionRight+1.95,9.4, initialYDescriptionRight+1.95,"F")
    doc.line(7.2, initialYDescriptionRight+1.95,7.2, initialYDescriptionRight+2.15, "F")
    doc.line(9.4, initialYDescriptionRight+1.95,9.4, initialYDescriptionRight+2.15, "F")
    doc.line(7.2, initialYDescriptionRight+2.15,9.4, initialYDescriptionRight+2.15, "F")

    doc.line(7.2, initialYDescriptionRight+2.25,9.4, initialYDescriptionRight+2.25,"F")
    doc.line(7.2, initialYDescriptionRight+2.25,7.2, initialYDescriptionRight+2.45, "F")
    doc.line(9.4, initialYDescriptionRight+2.25,9.4, initialYDescriptionRight+2.45, "F")
    doc.line(7.2, initialYDescriptionRight+2.45,9.4, initialYDescriptionRight+2.45, "F")

    doc.line(7.2, initialYDescriptionRight+2.55,9.4, initialYDescriptionRight+2.55,"F")
    doc.line(7.2, initialYDescriptionRight+2.55,7.2, initialYDescriptionRight+2.75, "F")
    doc.line(9.4, initialYDescriptionRight+2.55,9.4, initialYDescriptionRight+2.75, "F")
    doc.line(7.2, initialYDescriptionRight+2.75,9.4, initialYDescriptionRight+2.75, "F")

    // LINEAS DEL BORDE DEL DOCUMENTO
    // linea izquierda
    doc.line(0.3, 0.3, 0.3, initialYDescriptionRight+3.05, "F");
    // linea derecha
    doc.line(9.7, 0.3, 9.7, initialYDescriptionRight+3.05, "F");
    // linea superior
    doc.line(0.3, 0.3, 9.7, 0.3, "F");
    // linea inferior
    doc.line(0.3, initialYDescriptionRight+3.05, 9.7, initialYDescriptionRight+3.05, "F");

    doc.save(`${comprobantNumber}.pdf`);
  };
