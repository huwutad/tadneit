const { readdirSync } = require('fs');
const ascii = require('ascii-table');

let table = new ascii('Lệnh');
table.setHeading("Tên", "Trạng thái");

module.exports = (client) => {
    readdirSync('./Command/').forEach(dir => {
        const commands = readdirSync(`./Command/${dir}/`).filter(file => file.endsWith('.js'));
        
        for (let file of commands) {
            let pull = require(`../Command/${dir}/${file}`);
        
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌');
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    })
    console.log(table.toString());
}