const functions = require('@google-cloud/functions-framework');
const bucketName = 'andi-data';
const { BigQuery } = require('@google-cloud/bigquery');
const { Storage } = require('@google-cloud/storage');

// Instantiate clients
const bigquery = new BigQuery();
const storage = new Storage();

// const datasetId = 'colt';
// const tableId = 'gsc-api-playma';
const datasetId = 'andreadataset';
const tableId = 'test';

function loadBigQueryData(datasetId, tableId, bucketName, filename, metadata) {
  return new Promise((resolve, reject) => {
    bigquery
      .dataset(datasetId)
      .table(tableId)
      .load(storage.bucket(bucketName).file(filename), metadata)
      .then(([job]) => {
        resolve(job); // Resolve the Promise with the job
      })
      .catch((err) => {
        reject(err); // Reject the Promise with the error
      });
  });
}

functions.cloudEvent('loadCSVFromGCS', (eventData, context, callback) => {
  const filename = eventData.subject;

  console.log(eventData, 'event dataa');
  // const loadData = new Promise((resolve, reject) => {
  //   bigquery
  //     .getDatasets({ projectId: 'true-alliance-382103' })
  //     .then((data) => {
  //       console.log(data, 'data');
  //       resolve(data);
  //     })
  //     .catch((err) => {
  //       console.log(err, 'err');
  //     });
  // });

  // return loadData.then((value) => {
  //   console.log(value);
  //   console.log(`Dataset created.`);
  //   // Expected output: "Success!"
  // });

  /**
   * Imports a GCS file into a table and overwrites
   * table data if table already exists.
   */

  // Configure the load job. For full list of options, see:
  // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
  const metadata = {
    sourceFormat: 'CSV',
    skipLeadingRows: 1,
    schema: {
      fields: [
        { name: 'name', type: 'STRING' },
        { name: 'post_abbr', type: 'STRING' },
      ],
    },
    // Set the write disposition to overwrite existing table data.
    // writeDisposition: 'WRITE_TRUNCATE',
    location: 'US',
  };

  // Load data from a Google Cloud Storage file into the table
  loadBigQueryData(datasetId, tableId, bucketName, filename, metadata)
    .then((job) => {
      console.log(`Job ${job.id} completed.`);

      // Do something with the completed job
    })
    .catch((err) => {
      console.log(err, 'error');
      throw err;
    });
});
