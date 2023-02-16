const OpenAPI = require("openapi-typescript-codegen");

OpenAPI.generate({
  input: `${__dirname}/schemas/partner.accounts-1.1.0.json`,
  output: `${__dirname}/api/accounts`,
  useOptions: true,
});

OpenAPI.generate({
  input: `${__dirname}/schemas/partner.documents-1.0.3.json`,
  output: `${__dirname}/api/documents`,
  useOptions: true,
});
