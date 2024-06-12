"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.schema = void 0;
var schema_1 = require("@graphql-tools/schema");
var core_1 = require("@mikro-orm/core");
var express_1 = require("express");
var graphql_yoga_1 = require("graphql-yoga");
var user_entity_1 = require("./modules/user/entities/user.entity");
var users = [
    {
        id: "1",
        login: "Laurin",
    },
    {
        id: "2",
        login: "Saihaj",
    },
    {
        id: "3",
        login: "Dotan",
    },
];
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: /* GraphQL */ "\n    type User {\n      id: ID!\n      login: String!\n    }\n    type Query {\n      hello: String\n      user(byId: ID!): User!\n    }\n  ",
    resolvers: {
        Query: {
            hello: function () { return "world"; },
            user: function (_, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    console.log(ctx.em.findAll(user_entity_1.User));
                    user = users.find(function (user) { return user.id === args.byId; });
                    if (!user) {
                        throw (0, graphql_yoga_1.createGraphQLError)("User with id '".concat(args.byId, "' not found."), {
                            extensions: {
                                code: "USER_NOT_FOUND",
                                someRandomExtensions: {
                                    aaaa: 3,
                                },
                            },
                        });
                    }
                    return [2 /*return*/, user];
                });
            }); },
        },
    },
});
var app = (0, express_1.default)();
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var orm, migrator, migrations, em, yoga, port;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, core_1.MikroORM.init()];
            case 1:
                orm = _a.sent();
                migrator = orm.getMigrator();
                return [4 /*yield*/, migrator.getPendingMigrations()];
            case 2:
                migrations = _a.sent();
                if (!(migrations && migrations.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, migrator.up()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                em = orm.em.fork();
                yoga = (0, graphql_yoga_1.createYoga)({
                    schema: exports.schema,
                    logging: true,
                    graphiql: true,
                    context: function (ctx) { return (__assign(__assign({}, ctx), { em: em })); },
                });
                // Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
                app.use(yoga.graphqlEndpoint, yoga);
                port = process.env.PORT || 5000;
                return [2 /*return*/, app.listen(port, function () {
                        console.log("server started on http://localhost:".concat(port).concat(yoga.graphqlEndpoint));
                    })];
        }
    });
}); };
exports.startServer = startServer;
