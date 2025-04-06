const UserDecisionTree = require('../models/UserDecisionTree');

const UserDecision = require('../models/UserDecision');

const TreeNode = require('../models/TreeNode');

const mongoose = require('mongoose');


async function createDecisionTree(userId, title) {
  const newTree = new UserDecisionTree({
    userId,
    title
  });
  await newTree.save();
  return newTree;
}

async function getUserDecisionTreesWithPaths(userId) {
    const trees = await UserDecisionTree.find({ userId });
  
    const treeResults = [];
  
    for (const tree of trees) {
      const decisions = await UserDecision.find({ treeId: tree._id })
        .populate('nodeId')
        .sort({ timestamp: 1 });
  
      treeResults.push({
        title: tree.title,
        createdAt: tree.createdAt,
        path: decisions.map(d => ({
          label: d.nodeId.label,
          decision: d.decisionLabel,
          score: d.nodeId.score,
          explanation: d.nodeId.explanation
        }))
      });
    }
  
    return treeResults;
  }

async function createTreeNode(label, score, explanation, parentId) {
  parentId = parentId || null; // Default to null if not provided
    const newNode = new TreeNode({
    label,
    score,
    explanation,
    parentId
  });
  await newNode.save();
  return newNode;
}

async function buildTree(parentId) {
    const parent = await TreeNode.findById(parentId).lean();
    console.log('Parent:', parent);
    if (!parent) return null;
  
    const children = await TreeNode.find({ parentId }).lean();
  
    const childTrees = await Promise.all(
      children.map(child => buildTree(child._id))
    );
  
    return {
      _id: parent._id,
      label: parent.label,
      description: parent.description,
      score: parent.score,
      explanation: parent.explanation,
      children: childTrees.filter(Boolean) // remove any nulls
    };
  }

async function getTreeAndNodes(rootId){
    if (!mongoose.Types.ObjectId.isValid(rootId)) {
        console.error('Invalid ObjectId:', rootId);
        return null;
    }

    const tree = await buildTree(rootId);
    if (!tree) {
      console.error('Tree not found for ID:', rootId);
       return null;
    }

    return tree;
}

async function createUserDecision(decisionTreeId, rootId, decisionLabel) {
    const newDecision = new UserDecision({
        decisionTreeId,
        rootId,
        decisionLabel
    });
    await newDecision.save();
    return newDecision;
}

async function getDecisionTreeFromUserId(userId) {
    const decisionTree = await UserDecisionTree.findOne({ userId });
    if (!decisionTree) {
        throw new Error('No decision tree found for this user');
    }
    return decisionTree;
}

async function getUserDecisionByDecisionTreeId(decisionTreeId) {
    const decision = await UserDecision.findOne({ decisionTreeId });
    if (!decision) {
        throw new Error('No decision found for this decision tree');
    }
    return decision;
}

module.exports = {
    createDecisionTree,
    getUserDecisionTreesWithPaths,
    createTreeNode,
    getTreeAndNodes,
    createUserDecision,
    getDecisionTreeFromUserId,
    getUserDecisionByDecisionTreeId
};