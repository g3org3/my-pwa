const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const headers = {
  authorization: `Bearer ${API_KEY}`,
  'content-type': 'application/json',
  host: 'https://api.airtable.com',
};

export const getActivities = async () => {
  const url = `https://api.airtable.com/v0/${BASE_ID}/eventos?view=Grid%20view`;
  const res = await fetch(url, { headers });

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
