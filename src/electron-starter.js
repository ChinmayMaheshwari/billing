const {
    app,
    BrowserWindow,
    ipcMain
  } = require("electron");

const path = require('path');
const url = require('url');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
    
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, 
        webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }});
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    // and load the index.html of the app.
    mainWindow.loadURL(startUrl);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',() =>{
    createWindow();
    db.serialize(function() {
        db.run("CREATE TABLE if not exists records (\
                invoice_id integer PRIMARY KEY, \
                vehicle_number TEXT, \
                date DATETIME, \
                seller_name TEXT, \
                buyer_name TEXT, \
                category TEXT, \
                rate integer, \
                bags integer, \
                GrossWeight FLOAT, \
                DeductionWeight FLOAT, \
                NetWeight FLOAT, \
                hamali integer, \
                majdoori integer, \
                bhada integer, \
                digar integer, \
                cash integer, \
                kata integer, \
                advance integer, \
                total integer, \
                notes TEXT \
              )");

        // var stmt = db.prepare("INSERT INTO records VALUES (?,?,?)");
        // for (var i = 0; i < 10; i++) {
        //     stmt.run(i, 'Seller '+i, 'Buyer '+i);
        // }
        // stmt.finalize();

        // db.each("SELECT invoice_id AS id, seller_name, buyer_name FROM records", function(err, row) {
        //     console.log(row.id + ": " + row.seller_name);
        // });
    });

    }
);
app.on('quit', () => {
    db.close();
})
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on("getBillByName", (event, data) => {
    var results = []
    if (data.q){
            db.each(`SELECT * FROM records where buyer_name LIKE '%${data.q}%'`, function(err, row) {
            results.push(row);
             }, () => event.sender.send("response", {'success':'true', "data": results}))
    }
    else{
        db.each(`SELECT * FROM records`, function(err, row) {
            results.push(row);
             }, () => {
                 let result = []
                 results.forEach( (res) => {
                     if (res.date> data.past){
                        result.push(res);
                     }
                    });
                 event.sender.send("response", {'success':'true', "data": result})
                })
        
    }
    })

ipcMain.on("createBill", (event, data) => {
    let GrossWeight = parseFloat(parseInt(data.GrossWeightInKwintal) + parseInt(data.GrossWeightInKilo)/1000)
    let DeductionWeight = parseFloat(parseInt(data.DeductionWeightInKwintal) + parseInt(data.DeductionWeightInKilo)/1000)
    let NetWeight = parseFloat(parseInt(data.NetWeightInKwintal) + parseInt(data.NetWeightInKilo)/1000)
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
        stmt.run(data.invoice_id, data.vehicle_number, data.date, data.seller_name, data.buyer_name, 
                data.category, 
                data.rate,
                data.bags,
                GrossWeight,
                DeductionWeight,
                NetWeight,
                data.hamali,
                data.majdoori ,
                data.bhada ,
                data.digar ,
                data.cash ,
                data.kata ,
                data.advance ,
                data.total ,
                data.notes
                 );
        stmt.finalize();
        // db.each("SELECT invoice_id AS id, seller_name, buyer_name FROM records", function(err, row) {
        //     console.log(row.id + ": " + row.seller_name);
        mainWindow.webContents.send("response", {'success': 'true'});
        // });
    })

  });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.