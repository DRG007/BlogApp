const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/", (request, response) => {
  const { title, content } = request.body;

  const query = `insert into blogDetails (title, content, userId) values (?, ?, ?)`;
  db.query(query, [title, content, request.user.id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/allBlogs", (request, response) => {
  const query = `select id, title, content, status from blogDetails`;
  db.query(query,[], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/myBlogs", (request, response) => {
  const query = `select id, title, content, status from blogDetails where userId = ?`;
  db.query(query, [request.user.id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const singleblog = `select id, title, content , status from blogDetails where id = ?`;
  db.query(singleblog,[id], (error, result)=> {
    response.send(utils.createResult(error, result));
  })
})

router.put("/:id", (request, response) => {
  const { title, content } = request.body;
  const { id } = request.params;

  const checkOwnerQuery = `select count (*) as count from blogDetails where id = ? and userId = ?`;
  db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (result.length == 0) {
      response.send(utils.createErrorResult("invalid result"));
    } else {
      const info = result[0];
      if (info["count"] == 0) {
        response.send(
          utils.createErrorResult("this blog does not belong to you")
        );
      } else {
        const query = `update blogDetails set title = ?, content = ? where id = ?`;
        db.query(query, [title, content, id], (error, result) => {
          response.send(utils.createResult(error, result));
        });
      }
    }
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;

  const checkOwnerQuery = `select count (*) as count from blogDetails where id = ? and userId = ?`;
  db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (result.length == 0) {
      response.send(utils.createErrorResult("invalid result"));
    } else {
      const info = result[0];
      if (info["count"] == 0) {
        response.send(
          utils.createErrorResult("this blog does not belong to you")
        );
      } else {
        const query = `delete from blogDetails where id = ?`;
        db.query(query, [id], (error, result) => {
          response.send(utils.createResult(error, result));
        });
      }
    }
  });
});
module.exports = router;
