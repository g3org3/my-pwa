const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const headers = {
  authorization: `Bearer ${API_KEY}`,
  'content-type': 'application/json',
  host: 'https://api.airtable.com',
};
const url = `https://api.airtable.com/v0/${BASE_ID}/eventos`;

export const removeActivity = async (id) => {
  const data = new FormData();
  data.append('record', id);

  const res = await fetch(`${url}?records[]=${id}`, {
    headers: {
      ...headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'DELETE',
  });
  if (res.status > 299) {
    console.log(await res.text());

    return false;
  }
  return true;
};

export const getActivities = async () => {
  const res = await fetch(`${url}?view=Grid%20view`, { headers });

  if (res.status > 299) {
    console.log(await res.text());

    return [];
  }

  const { records } = await res.json();

  return records.map((x) => ({
    id: x.id,
    ...x.fields,
  }));
};
