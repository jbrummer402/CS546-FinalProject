const express = require("express");
const router = express.Router();
const data = require("../data");
const jobsData = data.jobs;
const ObjectId = require("mongodb").ObjectId;

router.post("/", async (req, res) => {
  let {
    compensation,
    perHour,
    title,
    description,
    datePosted,
    address,
    creatorId,
  } = req.body;

  // // handle inputs
  const { errorCode, message } = await checkInputs();
  if (errorCode !== 0) {
    res.status(errorCode).json({ error: message });
    return;
  }

  try {
    const newJob = await jobsData.create(
      compensation,
      perHour,
      title,
      description,
      datePosted,
      address,
      creatorId
    );
    res.json(newJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

//get every job
router.get("/", async (req, res) => {
  try {
    let everyJob = await jobsData.getJobs();
    res.json(everyJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/search/:searchTerm', async (req, res) => {
  try {
    let searchData = jobsData.searchByTerms(xss(req.params.body));
    res.json(searchData);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "job not found" });
  }
});

router.get('/:id', async(req, res) => {
  if (!req.params.id) {
    res.status(404).send({message: "Id is not given"});
    return;
  }
  if (!ObjectId.isValid(xss(req.params.id))) {
    res.status(404).send({message: "Id is not valid"});
    return;
  }
  try {
    const jobById = await jobsData.readByID(xss(req.params.id));
    res.json(jobById);
  } catch (e) {
    res.status(500).send({error : e});
  }
})

// to be implemented
async function checkInputs() {
  return { errorCode: 0, message: "" };
}

module.exports = router;
