import info from './common';

export async function getComments() {
    const response = await fetch(`${info.proxy}/api/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export async function setItem(commentInput, postId) {
    const response = await fetch(`${info.proxy}/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ email: commentInput.email, name: commentInput.name, comment: commentInput.comment, postId: postId }),
    })

    const body = await response.text();
    return body;
}


export async function editStatus(status, commentId, isReplyStatus, replyId) {
    const response = await fetch(`${info.proxy}/api/comment/${commentId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ status: status, replyBody: false, isReplyStatus: isReplyStatus, replyId: replyId })
        })
    const body = await response.text();
    return body;
}


export async function editPartOfCommentOrReply(comment, commentId, isReplyStatus, replyId, isReplyPatch) {
    const response = await fetch(`${info.proxy}/api/comment/${commentId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ name: comment.name, email: comment.email, comment: comment.comment, replyBody: false, isReplyStatus: isReplyStatus, replyId: replyId, isReplyPatch: isReplyPatch })
        })
    const body = await response.text();
    return body;
}

export async function editSpecificComment(commentId, reply) {
    const response = await fetch(`${info.proxy}/api/comment/${commentId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ email: reply.email, name: reply.name, comment: reply.comment, replyBody: true })
        })
    const body = await response.text();
    return body;
}

export async function deleteSpecificComment(commentId, isReply, replyId) {
    const response = await fetch(`${info.proxy}/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ isReply: isReply, replyId: replyId })
    })
    const body = await response.text();
    return body;
}




