import info from './common';

export async function sendEmail(to, subject, html, randomString) {
    const response = await fetch(`${info.proxy}/api/send-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ to: to, subject: subject, html: html, randomString: randomString }),
    })
    const body = await response.text();
    return body;
}

export async function getAllEmails() {
    const response = await fetch(`${info.proxy}/api/emails`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export async function setEmailInfo(email) {
    const response = await fetch(`${info.proxy}/api/emails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ email: email.emailAddress, confirm: false, randomString: email.randomString }),
    })

    const body = await response.json();
    return body;
}

export async function setTemplate(template, html) {
    const response = await fetch(`${info.proxy}/api/templates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ name: template.name, subject: template.subject, html: html }),
    })

    const body = await response.text();
    return body;
}

export async function getAllTemplates() {
    const response = await fetch(`${info.proxy}/api/templates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export function deleteSpecificTemplate(templateId) {
    const response = fetch(`${info.proxy}/api/templates/${templateId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${info.token}`
        }
    })
    return response;
}

export async function editSpecificTemplate(templateId, template, html) {
    const response = await fetch(`${info.proxy}/api/templates/${templateId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ name: template.name, subject: template.subject, html: html }),
        })
    const body = await response.text();
    return body;
}

export async function getSpecificTemplate(templateId) {
    const response = await fetch(`${info.proxy}/api/templates/${templateId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export async function editSpecificEmail(randomString, confirm) {
    const response = await fetch(`${info.proxy}/api/emails/${randomString}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${info.token}`
            },
            body: JSON.stringify({ confirm: confirm }),
        })
    const body = await response.json();
    return body;
}

export async function getSpecificEmail(randomString) {
    const response = await fetch(`${info.proxy}/api/emails/${randomString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json())
    return response;
}

export function deleteSpecificEmail(randomString) {
    const response = fetch(`${info.proxy}/api/emails/${randomString}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${info.token}`
        }
    })
    return response;
}