const ONES = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
const TENS = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

export function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (ONES[Number(n[1])] || TENS[n[1][0]] + ' ' + ONES[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (ONES[Number(n[2])] || TENS[n[2][0]] + ' ' + ONES[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (ONES[Number(n[3])] || TENS[n[3][0]] + ' ' + ONES[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (ONES[Number(n[4])] || TENS[n[4][0]] + ' ' + ONES[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (ONES[Number(n[5])] || TENS[n[5][0]] + ' ' + ONES[n[5][1]]) + 'only ' : '';
    return str;
}

export const getInvoiceNumber = () => {
    let num = localStorage.getItem('invoice_number');
    if (!num){
      num = 0;
    }
    num = parseInt(num)+1
    localStorage.setItem('invoice_number', num);
    return num
}

export const getInteger = (val) => {
 return parseInt(val) ? parseInt(val): 0
}

export const intialStateData = {
    'invoice_id': '',
    'vehicle_number': '',
    'date': new Date().toDateString(),
    'seller_name': '',
    'buyer_name': '',
    'category': 'Cotton',
    'rate': '',
    'bags': '',
    'GroosWeightInKwintal': '',
    'GrossWeightInKilo': '',
    'DeductionWeightInKwintal': '',
    'DeductionWeightInKilo': '',
    'NetWeightInKwintal': 0,
    'NetWeightInKilo': 0,
    'hamali': '',
    'majdoori': '',
    'bhada': '',
    'digar': '',
    'cash': '',
    'kata': '',
    'advance': 0,
    'total': 0,
    'totalInWords': 'Zero',
    'notes': '',
  }