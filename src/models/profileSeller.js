const db = require('../helpers/db');
const { LIMIT_DATA } = process.env;

exports.getAllSeller = (
  keyword,
  sortby,
  sort,
  limit = parseInt(LIMIT_DATA),
  offset = 0,
  cb
) => {
  db.query(
    `SELECT * FROM profiles WHERE full_name LIKE '%${keyword}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
    [limit, offset],
    (err, res) => {
      // console.log(err);
      cb(err, res.rows);
    }
  );
};

exports.countAllSeller = (keyword, cb) => {
  db.query(
    `SELECT * FROM profiles WHERE full_name LIKE '%${keyword}%' `,
    (err, res) => {
      cb(err, res.rowCount);
    }
  );
};

exports.getSellerById = (id, cb) => {
  const q = 'SELECT * FROM profiles WHERE id=$1';
  const val = [id];

  db.query(q, val, (err, res) => {
    // console.log(res);
    cb(err, res);
  });
};

exports.createSeller = (picture, data, cb) => {
  
  const q =
  'INSERT INTO profiles (full_name, gender, image, store_name, store_desc, phone_num, bio, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const val = [data.full_name, data.gender, picture, data.store_name, data.store_desc, data.phone_num, data.bio, data.user_id];

  db.query(q, val, (err, res) => {
    cb(err, res);
    console.log(val); 
  });
};

exports.updateSeller = (id, picture, data, cb) => {
  console.log();
  let val = [id];

  const filtered = {};

  const objt = {
    full_name: data.full_name,
    gender: data.gender,
    image: picture,
    store_name: data.store_name,
    store_desc: data.store_desc,
    phone_num: data.phone_num,
    bio: data.bio,
    user_id: data.user_id,
  };

  for (let x in objt) {
    if (objt[x] !== null  && objt[x]!= '') {
      filtered[x] = objt[x];
      val.push(objt[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind + 2}`);
// console.log(finalResult)
  const q = `UPDATE profiles SET ${finalResult} WHERE id=$1 RETURNING *`;
  db.query(q, val, (err, res) => {
    // console.log(val)
    if (res) {
      cb(err, res);
    } else {
      cb(err, res);
    }
  });
};

exports.deleteSeller = (id, cb) => {
  const q = 'DELETE FROM profiles WHERE id=$1 RETURNING *';
  const val = [id];

  db.query(q, val, (err, res) => {
    cb(err, res);
  });
};
