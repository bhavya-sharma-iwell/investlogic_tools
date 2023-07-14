const html_to_pdf = require("html-pdf-node")
const downloadInvoice = require('../services/invoiceGenerator')
const { RESPONSE_MSG, STATUS } = require('../constants')
const path = require('path')

const _generatePdf = async (file, options) => {
    try{
        await html_to_pdf.generatePdf(file, options)
        console.log("Pdf generated successfully")
    }
    catch(error){
        console.log(error)
        throw error
    }
}

const downloadInvoiceController = async (request, response) => {
    try{
        const data = request.query.data
        if(data.length==0){
            throw "Invalid data"
        }
        let requestOptions = data.replaceAll("hashSymbol", "#")
        requestOptions = requestOptions.replaceAll("ampersandSymbol", "&")
        requestOptions = requestOptions.replaceAll("percentageSymbol", "%")
        requestOptions = requestOptions.replaceAll("plusSymbol", "+")
        requestOptions = JSON.parse(requestOptions)
        const htmlCode = await downloadInvoice.downloadInvoiceService(requestOptions)
        const pdfFilePath = path.join(__dirname, '..', 'invoice.pdf')
        const options = { 
            format: 'A4',
            path: pdfFilePath
        }
        await _generatePdf({content: htmlCode}, options)
        response.download("invoice.pdf", "tax-invoice.pdf", function (error) {
            if(error){
                console.log("Error: ", error)
                throw error
            }else{
                console.log("Pdf downloaded successfully")
            }
        })
    }
    catch(error){
        response.send({
            status: -1,
            message: "Request Failed",
            result: error.message
        })
    }
}

module.exports = {
    downloadInvoiceController
}