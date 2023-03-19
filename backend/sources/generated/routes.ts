/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApiTokenController } from './../api/controllers/ApiTokenController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BadgesController } from './../api/controllers/BadgesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FilesController } from './../api/controllers/FilesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GroupsController } from './../api/controllers/GroupsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginController } from './../api/controllers/LoginController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SetupController } from './../api/controllers/SetupController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StatusController } from './../api/controllers/StatusController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UploadController } from './../api/controllers/UploadController';
import { expressAuthentication } from './../api/middlewares/tsoaAuthenticationMiddleware';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler, Router } from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ErrorHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "details": {"dataType":"any"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Id": {
        "dataType": "refAlias",
        "type": {"dataType":"integer","validators":{"isInt":{"errorMsg":"Id must be an integer"},"minimum":{"errorMsg":"Id must be positive","value":1}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokenHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Id","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "expireAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "isValid": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokensResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "apiTokens": {"dataType":"array","array":{"dataType":"refObject","ref":"ApiTokenHttpEntity"},"required":true},
            "count": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokenResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "apiToken": {"ref":"ApiTokenHttpEntity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokenCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "apiToken": {"ref":"ApiTokenHttpEntity","required":true},
            "bearerToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokenCreateHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'name' is required","value":".*[\\S\\s].*"}}},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "expireAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiTokenEditHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'name' is required","value":".*[\\S\\s].*"}}},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Color": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"errorMsg":"'color' is invalid","value":"^#[0-9A-Fa-f]{6}$"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BadgeHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Id","required":true},
            "name": {"dataType":"string","required":true},
            "color": {"ref":"Color","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BadgesHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "count": {"dataType":"double","required":true},
            "badges": {"dataType":"array","array":{"dataType":"refObject","ref":"BadgeHttpEntity"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BadgeHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "badge": {"ref":"BadgeHttpEntity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BadgeCreateUpdateHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'name' is required","value":".*[\\S\\s].*"}}},
            "color": {"ref":"Color","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Uuid": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Id","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"ref":"Uuid","required":true},
            "name": {"dataType":"string","required":true},
            "comment": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "mimeType": {"dataType":"string","required":true},
            "size": {"dataType":"double","required":true},
            "hash": {"dataType":"string","required":true},
            "downloadCount": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updateAt": {"dataType":"datetime","required":true},
            "group": {"dataType":"union","subSchemas":[{"ref":"GroupHttpEntity"},{"dataType":"enum","enums":[null]}],"required":true},
            "badges": {"dataType":"array","array":{"dataType":"refObject","ref":"BadgeHttpEntity"},"required":true},
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FilesHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "count": {"dataType":"double","required":true},
            "files": {"dataType":"array","array":{"dataType":"refObject","ref":"FileHttpEntity"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StorageHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "totalSpace": {"dataType":"double","required":true},
            "usedSpace": {"dataType":"double","required":true},
            "availableSpace": {"dataType":"double","required":true},
            "storagePath": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StorageHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "storageData": {"ref":"StorageHttpEntity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReadStream": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "file": {"ref":"FileHttpEntity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FileUpdateHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'name' is required","value":".*[\\S\\s].*"}}},
            "comment": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "groupId": {"dataType":"union","subSchemas":[{"ref":"Id"},{"dataType":"enum","enums":[null]}]},
            "badgeIds": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"refAlias","ref":"Id"}},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupsHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "count": {"dataType":"double","required":true},
            "groups": {"dataType":"array","array":{"dataType":"refObject","ref":"GroupHttpEntity"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "group": {"ref":"GroupHttpEntity","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupCreateUpdateHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'name' is required","value":".*[\\S\\s].*"}}},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BearerHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "jwtToken": {"dataType":"string","required":true},
            "expireAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OtpLoginHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "otpToken": {"dataType":"string","required":true,"validators":{"pattern":{"value":"[0-9]{6}"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OtpInitHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "otpSecret": {"dataType":"string","required":true},
            "otpUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OtpInitHttpEntity": {
        "dataType": "refObject",
        "properties": {
            "otpToken": {"dataType":"string","required":true,"validators":{"pattern":{"value":"[0-9]{6}"}}},
            "otpSecret": {"dataType":"string","required":true,"validators":{"pattern":{"errorMsg":"'otpSecret' is required","value":".*[\\S\\s].*"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusHttpResponse": {
        "dataType": "refObject",
        "properties": {
            "httpCode": {"dataType":"double","required":true},
            "error": {"dataType":"boolean","required":true},
            "message": {"dataType":"string","required":true},
            "ready": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/tokens',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController)),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController.prototype.getList)),

            function ApiTokenController_getList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ApiTokenController();


              const promise = controller.getList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tokens/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController)),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController.prototype.get)),

            function ApiTokenController_get(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ApiTokenController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tokens',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController)),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController.prototype.generate)),

            function ApiTokenController_generate(request: any, response: any, next: any) {
            const args = {
                    tokenRequest: {"in":"body","name":"tokenRequest","required":true,"ref":"ApiTokenCreateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ApiTokenController();


              const promise = controller.generate.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/tokens/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController)),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController.prototype.update)),

            function ApiTokenController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
                    tokenUpdate: {"in":"body","name":"tokenUpdate","required":true,"ref":"ApiTokenEditHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ApiTokenController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/tokens/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController)),
            ...(fetchMiddlewares<RequestHandler>(ApiTokenController.prototype.revoke)),

            function ApiTokenController_revoke(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ApiTokenController();


              const promise = controller.revoke.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/badges',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BadgesController)),
            ...(fetchMiddlewares<RequestHandler>(BadgesController.prototype.getList)),

            function BadgesController_getList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BadgesController();


              const promise = controller.getList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/badges/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BadgesController)),
            ...(fetchMiddlewares<RequestHandler>(BadgesController.prototype.get)),

            function BadgesController_get(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BadgesController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/badges',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BadgesController)),
            ...(fetchMiddlewares<RequestHandler>(BadgesController.prototype.create)),

            function BadgesController_create(request: any, response: any, next: any) {
            const args = {
                    toCreate: {"in":"body","name":"toCreate","required":true,"ref":"BadgeCreateUpdateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BadgesController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/badges/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BadgesController)),
            ...(fetchMiddlewares<RequestHandler>(BadgesController.prototype.update)),

            function BadgesController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
                    toUpdate: {"in":"body","name":"toUpdate","required":true,"ref":"BadgeCreateUpdateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BadgesController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/badges/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(BadgesController)),
            ...(fetchMiddlewares<RequestHandler>(BadgesController.prototype.delete)),

            function BadgesController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new BadgesController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/files',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.getList)),

            function FilesController_getList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.getList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/files/storage',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.getStorage)),

            function FilesController_getStorage(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.getStorage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/files/:uuid',
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.download)),

            function FilesController_download(request: any, response: any, next: any) {
            const args = {
                    uuid: {"in":"path","name":"uuid","required":true,"ref":"Uuid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.download.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/files/:uuid/change-uuid',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.changeUuid)),

            function FilesController_changeUuid(request: any, response: any, next: any) {
            const args = {
                    uuid: {"in":"path","name":"uuid","required":true,"ref":"Uuid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.changeUuid.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/files/:uuid',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.update)),

            function FilesController_update(request: any, response: any, next: any) {
            const args = {
                    uuid: {"in":"path","name":"uuid","required":true,"ref":"Uuid"},
                    body: {"in":"body","name":"body","required":true,"ref":"FileUpdateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/files/:uuid',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.delete)),

            function FilesController_delete(request: any, response: any, next: any) {
            const args = {
                    uuid: {"in":"path","name":"uuid","required":true,"ref":"Uuid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/groups',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.getList)),

            function GroupsController_getList(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.getList.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/groups/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.get)),

            function GroupsController_get(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/groups',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.create)),

            function GroupsController_create(request: any, response: any, next: any) {
            const args = {
                    toCreate: {"in":"body","name":"toCreate","required":true,"ref":"GroupCreateUpdateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/groups/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.update)),

            function GroupsController_update(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
                    toUpdate: {"in":"body","name":"toUpdate","required":true,"ref":"GroupCreateUpdateHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/groups/:id',
            authenticateMiddleware([{"bearer":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GroupsController)),
            ...(fetchMiddlewares<RequestHandler>(GroupsController.prototype.delete)),

            function GroupsController_delete(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"Id"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new GroupsController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/login',
            ...(fetchMiddlewares<RequestHandler>(LoginController)),
            ...(fetchMiddlewares<RequestHandler>(LoginController.prototype.login)),

            function LoginController_login(request: any, response: any, next: any) {
            const args = {
                    otpEntity: {"in":"body","name":"otpEntity","required":true,"ref":"OtpLoginHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LoginController();


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/setup',
            ...(fetchMiddlewares<RequestHandler>(SetupController)),
            ...(fetchMiddlewares<RequestHandler>(SetupController.prototype.getOtpSecret)),

            function SetupController_getOtpSecret(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SetupController();


              const promise = controller.getOtpSecret.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/setup',
            ...(fetchMiddlewares<RequestHandler>(SetupController)),
            ...(fetchMiddlewares<RequestHandler>(SetupController.prototype.SaveOtpSecret)),

            function SetupController_SaveOtpSecret(request: any, response: any, next: any) {
            const args = {
                    otpInit: {"in":"body","name":"otpInit","required":true,"ref":"OtpInitHttpEntity"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SetupController();


              const promise = controller.SaveOtpSecret.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/status',
            ...(fetchMiddlewares<RequestHandler>(StatusController)),
            ...(fetchMiddlewares<RequestHandler>(StatusController.prototype.get)),

            function StatusController_get(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new StatusController();


              const promise = controller.get.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/upload',
            authenticateMiddleware([{"bearer":[]}]),
            upload.single('file'),
            ...(fetchMiddlewares<RequestHandler>(UploadController)),
            ...(fetchMiddlewares<RequestHandler>(UploadController.prototype.upload)),

            function UploadController_upload(request: any, response: any, next: any) {
            const args = {
                    file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                    name: {"in":"formData","name":"name","dataType":"string"},
                    comment: {"in":"formData","name":"comment","dataType":"string"},
                    groupId: {"in":"formData","name":"groupId","dataType":"string"},
                    badgeIds: {"in":"formData","name":"badgeIds","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UploadController();


              const promise = controller.upload.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
