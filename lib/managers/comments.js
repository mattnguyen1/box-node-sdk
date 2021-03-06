/**
 * @fileoverview Manager for the Box Comments Resource
 * @author fschott
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/comments';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Comment' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Comments(client) {
	this.client = client;
}

/**
 * Requests a comment object with the given ID.
 *
 * API Endpoint: '/comments/:commentID'
 * Method: GET
 *
 * @param {string} commentID - Box ID of the comment being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the comment information if it was acquired successfully
 * @returns {void}
 */
Comments.prototype.get = function(commentID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, commentID);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Posts a new comment on a file.
 *
 * API Endpoint: '/comments
 * Method: POST
 *
 * @param {string} fileID - Box file id of the file to comment on
 * @param {string} commentBody - text of the comment
 * @param {Function} callback - passed the new comment data if it was posted successfully
 * @returns {void}
 */
Comments.prototype.create = function(fileID, commentBody, callback) {
	// @TODO(bemerick) 2013-10-29: Don't hardcode this 'item'. Abstract to all commentable types...
	var params = {
		body: {
			item: {
				type: 'file',
				id: fileID
			},
			message: commentBody
		}
	};
	this.client.post(BASE_PATH, params, this.client.defaultResponseHandler(callback));
};

/**
 * Posts a new tagged comment on a file.
 *
 * API Endpoint: '/comments
 * Method: POST
 *
 * @param {string} fileID - Box file id of the file to comment on
 * @param {string} commentBody - text of the tagged comment
 * @param {Function} callback - passed the new tagged comment data if it was posted successfully
 * @returns {void}
 */
Comments.prototype.createTaggedComment = function(fileID, commentBody, callback) {
	var params = {
		body: {
			item: {
				type: 'file',
				id: fileID
			},
			tagged_message: commentBody
		}
	};
	this.client.post(BASE_PATH, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update some information about a given comment.
 *
 * API Endpoint: '/comments/:commentID'
 * Method: PUT
 *
 * @param {string} commentID - Box ID of the comment being requested
 * @param {?Object} options - Additional options can be passed with the request via form body. Can be left null in most cases.
 * @param {Function} callback - Passed the updated comment information if it was acquired successfully
 * @returns {void}
 */
Comments.prototype.update = function(commentID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, commentID);
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Delete a given comment.
 *
 * API Endpoint: '/comments/:commentID'
 * Method: DELETE
 *
 * @param {string} commentID - Box ID of the comment being requested
 * @param {Function} callback - Empty response body passed if successful.
 * @returns {void}
 */
Comments.prototype.delete = function(commentID, callback) {

	var apiPath = urlPath(BASE_PATH, commentID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};


/**
 * @module box-node-sdk/lib/managers/comments
 * @see {@Link Comments}
 */
module.exports = Comments;
