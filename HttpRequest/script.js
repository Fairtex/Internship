'use strict';

async function HttpRequest() {

    const content = document.querySelector('.content');
    const modalPopup = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const userInfo = modalPopup.querySelector('.user-info');
    const userPosts = modalPopup.querySelector('.user-posts');
    const closeBtn = modalPopup.querySelector('.modal__close-btn');
    const modalComments = document.querySelector('.modal-comments');
    const postTextBlock = modalComments.querySelector('.post-text');
    const postTitleBlock = modalComments.querySelector('.post-title');
    const commentsBlock = modalComments.querySelector('.all-comments');
    const closeCommentsBtn = modalComments.querySelector('.close-comments-btn');

    const users = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert(`Ошибка HTTP: ${response.status}`);
            }
        })
        .catch(error => console.log(error));

    users.forEach(el => {
        content.insertAdjacentHTML('beforeend', `<a class="user-link" href=# data-id=${el.id}>${el.name}</a>`);
    });

    const userLinks = document.querySelectorAll('.user-link');

    Array.prototype.forEach.call(userLinks, link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log(`Нажата клавиша ${link.textContent}`);
            overlay.classList.remove('hide');
            modalPopup.classList.remove('hide');
            users.forEach(el => {
                if (link.dataset.id == el.id) {
                    for (let key in el) {
                        if (typeof el[key] === 'object') {
                            userInfo.insertAdjacentHTML('beforeend', `<div class="user-info__item">${key}: ${JSON.stringify(el[key])} </div>`)
                        } else {
                            userInfo.insertAdjacentHTML('beforeend', `<div class="user-info__item">${key}: ${el[key]} </div>`);
                        }
                    };
                }
            });

            const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert(`Ошибка HTTP: ${response.status}`);
                    }
                })
                .catch(error => console.log(error));

            const currentUserPosts = posts.filter(el => {
                if (link.dataset.id == el.userId) {
                    return el
                }
            });
            console.log(currentUserPosts);
            currentUserPosts.forEach((el, index) => {
                userPosts.insertAdjacentHTML('beforeend', `<li class="user-posts__item" data-postId=${el.id}></li>`);
                let currentPost = userPosts.querySelectorAll('.user-posts__item');
                currentPost[index].insertAdjacentHTML('beforeend', `<div class="user-posts__title">${el.title}</div>`);
                currentPost[index].insertAdjacentHTML('beforeend', `<div class="user-posts__text">${el.body}</div>`);
                currentPost[index].insertAdjacentHTML('beforeend', `<button type="button" class="show-comments">Show comments</button>`);
            });
            const commentButtons = userPosts.querySelectorAll('.show-comments');
            Array.prototype.forEach.call(commentButtons, button => {
                button.addEventListener('click', async () => {
                    const postText = button.previousElementSibling;
                    const postTitle = postText.previousElementSibling;
                    const post = button.parentElement;

                    modalComments.classList.remove('hide');
                    overlay.classList.add('over-overlay');

                    postTextBlock.textContent = postText.textContent;
                    postTitleBlock.textContent = postTitle.textContent;

                    const comments = await fetch('https://jsonplaceholder.typicode.com/comments')
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                alert(`Ошибка HTTP: ${response.status}`);
                            }
                        })
                        .catch(error => console.log(error));
                    console.log(comments);

                    const currentComments = comments.filter(el => {
                        if (post.dataset.postid == el.postId) {
                            return el;
                        }
                    });
                    console.log(currentComments);

                    currentComments.forEach((el, index) => {
                        commentsBlock.insertAdjacentHTML('beforeend', `<div class="comments__item" data-id=${el.id}></div>`);
                        let currentCom = commentsBlock.querySelectorAll('.comments__item');
                        currentCom[index].insertAdjacentHTML('beforeend', `<div class="comments__email">${el.email}</div>`);
                        currentCom[index].insertAdjacentHTML('beforeend', `<div class="comments__name">${el.name}</div>`);
                        currentCom[index].insertAdjacentHTML('beforeend', `<div class="comments__body">${el.body}</div>`);
                        currentCom[index].insertAdjacentHTML('beforeend', `<button type="button" class="delete-com">Delete comment</button>`);
                    });

                    const deleteBtns = commentsBlock.querySelectorAll('.delete-com');
                    Array.prototype.forEach.call(deleteBtns, deleteBtn => {
                        deleteBtn.addEventListener('click', async () => {
                            const currentCom = deleteBtn.parentElement;
                            const status = await fetch(`https://jsonplaceholder.typicode.com/comments/${currentCom.dataset.id}`, {
                                method: 'DELETE',
                            }).then(response => {
                                return response.status;
                            });
                            if (status == 200) {
                                currentCom.textContent = 'Comment has been deleted';
                            } else {
                                alert('Error!');
                            }
                        });
                    });
                    const commentForm = modalComments.querySelector('.comments-form');
                    const addComBtn = commentForm.querySelector('.form-submit');
                    addComBtn.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const comAuthName = commentForm.querySelector('.form-name');
                        const comAuthEmail = commentForm.querySelector('.form-email');
                        const comText = commentForm.querySelector('.form-textarea');
                        if ((typeof comAuthName.value === 'string' && comAuthName.value != '') &&
                            (typeof comAuthEmail.value === 'string' && comAuthEmail.value != '') &&
                            (typeof comText.value === 'string' && comText != '')) {
                            const status = await fetch('https://jsonplaceholder.typicode.com/comments', {
                                method: 'POST',
                                body: JSON.stringify({
                                    postId: currentComments[0].postId,
                                    id: comments.length + 1,
                                    name: comAuthName.value,
                                    email: comAuthEmail.value,
                                    body: comText.value
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(response => {
                                return response.status;
                            });
                            if (status >= 200 && status <= 400) {
                                commentsBlock.insertAdjacentHTML('beforeend', `<div class="comments__item">
                                <div class="comments__email">${comAuthEmail.value}</div>
                                <div class="comments__name">${comAuthName.value}</div>
                                <div class="comments__body">${comText.value}</div>
                                <button type="button" class="delete-com">Delete comment</button>
                                </div>`);
                                comAuthName.value = '';
                                comAuthEmail.value = '';
                                comText.value = '';
                            } else {
                                alert('Error!')
                            }
                        } else {
                            alert('Requre fields is not define');
                        }
                    });
                });
            });
        });
    });

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    closeCommentsBtn.addEventListener('click', closeModal);

    function closeModal() {
        if (modalComments.classList.contains('hide')) {
            modalPopup.classList.add('hide');
            overlay.classList.add('hide');
            userInfo.textContent = '';
            userPosts.textContent = '';
        } else {
            modalComments.classList.add('hide');
            overlay.classList.remove('over-overlay');
            postTextBlock.textContent = '';
            postTitleBlock.textContent = '';
            commentsBlock.textContent = '';
        }
    }
}

HttpRequest();