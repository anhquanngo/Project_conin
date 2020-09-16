const mongoose = require('mongoose')

var DataTable = require("mongoose-datatable").default
mongoose.plugin(DataTable.init)

mongoose.connect('mongodb://localhost/launch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const Schema = mongoose.Schema

const schemaUser = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "faker", "tester", "maker"],
      default: "user",
    },
    userId: { type: String, default: null },
    indexBip: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    lowfee: { type: Boolean, default: false },
    hash_pass: { type: String, default: "" },
    favorite: [
      {
        favoriteId: { type: String, default: "" },
        left: { type: String, default: "" },
        right: { type: String, default: "" },
      },
    ],
    language: {
      type: String,
      enum: ["en", "vi", "cn", "fr", "kr", "jp"],
      default: "en",
    },
    currency: {
      type: String,
      enum: ["USD", "VND", "CNY", "JPY", "KRW", "EUR"],
      default: "USD",
    },
    theme: { type: Boolean, default: false },
    asset: [
      {
        value: { type: Number, default: 0 },
        available: { type: Number, default: 0 },
        symbol: { type: String, default: "" },
        address: { type: String, default: "" },
        // private: {type: String, default: ''},
        memo: { type: String, default: "" },
      },
    ],
    history: [
      {
        mark: { type: Boolean, default: false },
        status: { type: String, default: "" },
        confirm: { type: Number, default: 0 },
        symbol: { type: String, default: "" },
        price: { type: Number, default: 0 },
        hash: { type: String, default: "" },
        from: { type: String, default: "" },
        to: { type: String, default: "" },
        value: { type: Number, default: 0 },
        fee: { type: Number, default: 0 },
        timestamp: { type: Number, default: Date.now },
      },
    ],
    openOrders: [
      {
        type: { type: String, default: "" },
        openId: { type: String, default: "" },
        total: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
        fill: { type: Number, default: 0 },
        side: { type: Boolean, default: false },
        left: { type: String, default: "" },
        right: { type: String, default: "" },
        price: { type: Number, default: 0 },
        trigger: { type: Number, default: 0 },
        timestamp: { type: Number, default: Date.now },
      },
    ],
    historyOrders: [
      {
        type: { type: String, default: "" },
        openId: { type: String, default: "" },
        total: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
        excuted: { type: Number, default: 0 },
        status: { type: String, default: "" },
        side: { type: Boolean, default: false },
        left: { type: String, default: "" },
        right: { type: String, default: "" },
        price: { type: Number, default: 0 },
        average: { type: Number, default: 0 },
        trigger: { type: Number, default: 0 },
        timestamp: { type: Number, default: Date.now },
      },
    ],
    push: [
      {
        pushId: { type: String, default: "" },
        type: { type: String, default: "" },
        title: { type: String, default: "" },
        read: { type: Boolean, default: false },
        content: { type: String, default: "" },
        more: { type: String, default: "" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    vol24h: { type: Number, default: 0 },
    vol7d: { type: Number, default: 0 },
    vol30d: { type: Number, default: 0 },
    api: [
      {
        apiId: { type: String, default: "" },
        label: { type: String, default: "" },
        key: { type: String, default: "" },
        secret: { type: String, default: "" },
        permission: [
          {
            type: String,
            enum: ["read", "withdraw", "spot", "margin", "future", "bo"],
            default: "read",
          },
        ],
        ip: [{ type: String, default: "" }],
        expired: { type: Date, default: null },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    tfa: {
      init: { type: Boolean, default: false },
      secret: { type: String, default: "" },
      permission: [
        {
          type: String,
          enum: ["withdraw", "login", "api", "whitelist"],
          default: null,
        },
      ],
      status: { type: Boolean, default: false },
    },
    sms: {
      forgotToken: { type: String, default: "" },
      area: { type: String, default: "" },
      phone: { type: String, default: "" },
      status: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
    mail: {
      forgotToken: { type: String, default: "" },
      email: {
        type: String,
        default: "",
        text: true
      },
      status: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
    telegram: {
      forgotToken: { type: String, default: "" },
      tlgId: { type: String, default: "" },
      status: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
    },
    session: [
      {
        device: { type: String, default: "" },
        timestamp: { type: Number, default: Date.now() },
        location: { type: String, default: "" },
        ip: { type: String, default: "" },
      },
    ],
    whitelist: {
      status: { type: Boolean, default: false },
      addresses: [
        {
          label: { type: String, default: "" },
          address: { type: String, default: "" },
        },
      ],
    },
    phishing: { type: String, default: "" },
    identity: {
      image: [{ type: String, default: "" }],// xoa if not
      fName: { type: String, default: "" },
      lName: { type: String, default: "" },
      born: { type: String, default: "" },
      phone: { type: String, default: "" },
      city: { type: String, default: "" },
      country: { type: String, default: "" },
      kycId: { type: String, default: "" },
      status: {
        type: String,
        enum: ["not", "pending", "error", "completed"],
        default: "not",
      },
      err: { type: String, default: "" }
    },
    invite: {
      parent: { type: String, default: "" },
      link: { type: String, default: "" },
      friends: { type: Number, default: 0 },
      bonus: { type: Number, default: 5 },
      earned: { type: Number, default: 0 },
      ranking: { type: Number, default: 0 },
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', schemaUser, 'users')
module.exports = User