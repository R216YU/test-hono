import axios from "axios";

const ENDPOINT = "http://localhost:8787/posts";

const testPostsCrudOperations = async () => {
  const id1 = Math.floor(Math.random() * 10000);
  const id2 = Math.floor(Math.random() * 10000);

  // create 1st
  const createResponse1 = await axios.post(ENDPOINT, {
    id: id1,
    title: "First Post",
  });
  console.log("Create 1st Response:", createResponse1.data);

  // read one
  const readOneResponse = await axios.get(`${ENDPOINT}/${id1}`);
  console.log("Read 1st Response:", readOneResponse.data);

  // update
  const updateResponse = await axios.put(`${ENDPOINT}/${id1}`, {
    title: "Updated First Post",
  });
  console.log("Update 1st Response:", updateResponse.data);

  // create 2nd
  const createResponse2 = await axios.post(ENDPOINT, {
    id: id2,
    title: "Second Post",
  });
  console.log("Create 2nd Response:", createResponse2.data);

  // read all
  const readAllResponse = await axios.get(ENDPOINT);
  console.log("Read All Response:", JSON.stringify(readAllResponse.data));

  // delete 1st
  const deleteResponse = await axios.delete(`${ENDPOINT}/${id1}`);
  console.log("Delete 1st Response:", deleteResponse.data);

  // delete 2nd
  const deleteResponse2 = await axios.delete(`${ENDPOINT}/${id2}`);
  console.log("Delete 2nd Response:", deleteResponse2.data);
};

testPostsCrudOperations();
