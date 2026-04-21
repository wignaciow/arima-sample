import { environment } from "../../../environments/environment";
import { buildHttpResource } from "./build-http-resource";
import { CORE_ENDPOINTS } from "./core-backend/core-endpoint";
import { READER_ENDPOINTS } from "./reader-backend/reader-endpoint";
import { REPORTS_ENDPOINTS } from "./reports-backend/reports-endpoint";

export const CoreApi = buildHttpResource({
    serviceHost: environment.api.core,
    serviceEndpoint: CORE_ENDPOINTS,
  });
  
  export const ReaderApi = buildHttpResource({
    serviceHost: environment.api.reader,
    serviceEndpoint: READER_ENDPOINTS,
  });
  
  export const ReportsApi = buildHttpResource({
    serviceHost: environment.api.reports,
    serviceEndpoint: REPORTS_ENDPOINTS,
  });