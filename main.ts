import credsData from './creds.json';
// import type { Creds } from '../sf/sf';
// import  { Sf } from '../sf/sf';
import type { Creds } from '@pogilvie/sf';
import { Sf } from '@pogilvie/sf';



const creds: Creds = credsData;
const sf = new Sf(creds);
const query = "SELECT Id, Name, Owner.Name FROM Account LIMIT 10"

let result = await sf.query(query);

if (result.success) {
    const formattedData = result.body.records.map( (row: any) => ({
        Id: row.Id,
        Name: row.Name,
        OwnerName: row.Owner.Name
    }));
    console.table(formattedData);
} else {
    console.log(`query: ${result.status} ${result.msg}`);
    console.log(JSON.stringify(result.body, null, 4));
    process.exit(1);
}

const newAccount = {
    Name: 'New Account Name',
    Type: 'Prospect',
    Industry: 'Technology',
    Website: 'https://example.com'
};

result = await sf.insert('Account', newAccount);
let newId;

if (result.success) {
    console.log(`insert record id: ${result.body.id}`);
    newId = result.body.id;
} else {
    console.log(`insert: ${result.status} ${result.msg}`);
    console.log(JSON.stringify(result.body, null, 4));
    process.exit(1);
}

const update = {
    Name: 'Updated Name'
};

result = await sf.update('Account', newId, update);

if (result.success) {
    console.log(`update success:${JSON.stringify(result)}`);
} else {
    console.log(`update: ${result.status} ${result.msg}`);
    console.log(JSON.stringify(result.body, null, 4));
    process.exit(1);
}




