var sessionIDsTable = [];




var sessionFindBySId = (sId)=>{
  return sessionIDsTable.find((node)=>{
      console.log(node.sessionId == sId);
      return node.sessionId == sId;
  });
}

sessionIDsTable.__proto__.findBySId = sessionFindBySId;



module.exports = sessionIDsTable;
