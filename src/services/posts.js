import info from './common';

export async function getPost() {
    const response = await fetch(`${info.proxy}/api/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json());
    return response;
}

export async function setItem(postInput, content) {
    const response = await fetch(`${info.proxy}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ title: postInput.title, content: content, displayImage: postInput.displayImage, edit: postInput.edit, description: postInput.description }),
    })

    const body = await response.text();
    return body;
}

export async function getSpecificPost(postId) {
    const response = await fetch(`${info.proxy}/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export async function editSpecificPost(postId, postInput, content) {
    const response = await fetch(`${info.proxy}/api/posts/${postId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ title: postInput.title, content: content, displayImage: postInput.displayImage, editLike: false, edit: postInput.edit, description: postInput.description })
        })
    const body = await response.text();
    return body;
}

export async function editPostLikes(postId, like) {
    const response = await fetch(`${info.proxy}/api/posts/${postId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ like: like, editLike: true })
        })
    const body = await response.text();
    return body;
}

export function deleteSpecificPost(postId) {
    const response = fetch(`${info.proxy}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${info.token}`
        }
    })
    return response;
}


