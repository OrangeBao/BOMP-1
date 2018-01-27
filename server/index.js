/**
 * Created by baoyinghai on 12/14/17.
 */
var express = require('express');
var bodyParder = require('body-parser');
var fileHelper = require('./file');
var cors = require('cors');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,Accept');
  next();
}
app.use(bodyParder.json());
// app.use(allowCrossDomain);
app.use(cors());
app.use(express.static('./public'));

app.post('/api/dashboards', function(req, res) {
  setTimeout(() => res.json({}), 2000);
});

app.get('/api/relations/dashboards', function (req, res) {
  res.json([
    {
      "id": 156,
      "title": "HCONTROL",
      "uri": "db/xin-de-mo-ban",
      "type": "dash-db",
      "tags": [

      ],
      "isStarred": false,
      "orgId": 1,
      "desc": null
    },
    {
      "id": 154,
      "title": "Node - Overview",
      "uri": "db/node-overview",
      "type": "dash-db",
      "tags": [

      ],
      "isStarred": false,
      "orgId": 1,
      "desc": "Basic graphs for CPU, Memory, Network, Disk, Load, Context Switches, Interrupts"
    },
    {
      "id": 155,
      "title": "Node Exporter Server Metrics",
      "uri": "db/node-exporter-server-metrics",
      "type": "dash-db",
      "tags": [
        "prometheus"
      ],
      "isStarred": false,
      "orgId": 1,
      "desc": "Dashboard to view multiple servers"
    }
  ]);
  // res.json([
  //   {
  //     title: '基础分析平台仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息…',
  //     id: 1,
  //     isUsed: true,
  //   },
  //   {
  //     title: '分析平台实时处理仪表盘理仪表盘理仪表盘理仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信为描述信息，此处是描述信息信息信',
  //     id: 2,
  //     isUsed: false,
  //   },
  //   {
  //     title: '基础分析平台实时仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息…',
  //     id: 3,
  //     isUsed: false,
  //   },
  //   {
  //     title: '分析平台实时处理仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息，此处是描述信息信息信息…',
  //     id: 4,
  //     isUsed: false,
  //   },
  //   {
  //     title: '基础分析平台实时仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息…',
  //     id: 5,
  //     isUsed: false,
  //   },
  //   {
  //     title: '分析平台实时处理仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息，此处是描述信息信息信息…',
  //     id: 6,
  //     isUsed: false,
  //   },
  //   {
  //     title: '基础分析平台实时仪表盘',
  //     desc: '此处是描述信息此处是描述信息此处为描述信息…',
  //     id: 7,
  //     isUsed: false,
  //   }
  // ]);
});

app.all('/api/relations/templates', function (req, res) {
  res.json([
    {
      "id": 63,
      "title": "新的模板1",
      "uri": "db/xin-de-mo-ban",
      "type": "dash-db",
      "tags": [

      ],
      "isStarred": false,
      "orgId": 5,
      "desc": "这是一个新的模板111"
    },
    {
      "id": 62,
      "title": "新的模板2",
      "uri": "db/xin-de-mo-ban2",
      "type": "dash-db",
      "tags": [

      ],
      "isStarred": false,
      "orgId": 5,
      "desc": "这是一个新的模板222"
    }
  ]);
});

app.get('/api/user/currentUser', function (req, res) {
  setTimeout(function() {
    res.json({
      "userId": 1,
      "userName": "admin",
      "perms": [
        "nav.edit",
        "nav.edit",
        "nav.view"
      ],
      "menus": [
       "home",
        "monitor",
        "template",
        "doc"
      ],
      "homePage": "db/xin-de-mo-ban",
      "roles": [
        {
          "id": 1,
          "name": "sys_admin",
          "type": "system",
          "lang1": "系统管理员",
          "createdUserId": 0,
          "updatedUserId": 0
        },
        {
          "id": 2,
          "name": "data_admin",
          "type": "system",
          "lang1": "数据管理员",
          "createdUserId": 0,
          "updatedUserId": 0
        },
        {
          "id": 3,
          "name": "project_admin",
          "type": "system",
          "lang1": "需求管理员",
          "createdUserId": 0,
          "updatedUserId": 0
        },
        {
          "id": 4,
          "name": "op_admin",
          "type": "system",
          "lang1": "租户管理员",
          "createdUserId": 0,
          "updatedUserId": 0
        },
        {
          "id": 6,
          "name": "dev",
          "type": "system",
          "lang1": "开发者",
          "createdUserId": 0,
          "updatedUserId": 0
        }
      ],
      "org": {
        "id": 1,
        "name": "admin",
        "parentId": -1,
        "createUserId": 1,
        "updateUserId": 1,
        "userId": 1,
        "hasChildren": true
      },
      "graOrg": {
        "dashboard": 1,
        "template": 1
      }
    })
  }, 0);

});

app.put('/api/relations/homePage', function(req, res) {
  res.json({
    "id": 7,
    "renterType": "USER",
    "renterId": 1,
    "module": "HOMEPAGE",
    "moduleStr": "db/xin-de-mo-ban"
  });
});

app.get('/api/relations/datasources', function(req,res) {
  setTimeout(() => {
    res.json([
      {
        "id": 45,
        "name": "os1",
        "lang1": "系统监控数据",
        "desc": "175的系统监控数据",
        "url": "http://10.139.8.175:9100",
        "labels": [],
        "createdTime": 1510038984000,
        "updatedTime": 1510038984000,
        "options": {
          "job_name": "os1",
          "static_configs": [
            {
              "targets": [
                "10.139.8.175:9100"
              ]
            }
          ],
          "honor_labels": true,
          "scrape_interval": "10s"
        }
      },
      {
        "id": 46,
        "name": "os2",
        "lang1": "系统监控数据lalalla",
        "desc": "175的系统监控数据",
        "url": "http://10.139.8.175:9100",
        "labels": [],
        "createdTime": 1510038984000,
        "updatedTime": 1510038984000,
        "regionId": 'aEN',
        "regionName": 'a中',
        "options": {
          "job_name": "os1",
          "static_configs": [
            {
              "targets": [
                "10.139.8.175:9100"
              ]
            }
          ],
          "honor_labels": true,
          "scrape_interval": "10s"
        }
      },
      {
        "id": 47,
        "name": "os3",
        "lang1": "系统监控数据lalalla333",
        "desc": "175的系统监控数据",
        "url": "http://10.139.8.175:9100",
        "labels": [],
        "createdTime": 1510038984000,
        "updatedTime": 1510038984000,
        "regionId": 'aEN',
        "regionName": 'a中',
        "options": {
          "job_name": "os1",
          "static_configs": [
            {
              "targets": [
                "10.139.8.175:9100"
              ]
            }
          ],
          "honor_labels": true,
          "scrape_interval": "10s"
        }
      },
      {
        "id": 55,
        "name": "os6",
        "lang1": "系统监控数据lalalla333",
        "desc": "175的系统监控数据",
        "url": "http://10.139.8.175:9100",
        "labels": [],
        "createdTime": 1510038984000,
        "updatedTime": 1510038984000,
        "regionId": 'aEN',
        "regionName": 'a中',
        "options": {
          "job_name": "os1",
          "static_configs": [
            {
              "targets": [
                "10.139.8.175:9100"
              ]
            }
          ],
          "honor_labels": true,
          "scrape_interval": "10s"
        }
      }
    ]);
  }, 2000)
});

app.get('/api/datasources/checkConn', function(req, res) {
  setTimeout(() => res.json({isOk: true}), 2000);
});

app.post('/api/relations/datasources', function(req,res) {
  res.json({});
});

app.post('/api/files/upload', function(req, res) {
  setTimeout(() => res.end(), 10000)
});

app.get('/mock', function(req, res) {
  setTimeout(() => {
    res.json({});
  }, 2000);
});

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

