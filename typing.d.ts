export interface Post {
    _id: string,
    _createdAt: string,
    title: string,
    slug: {
        current: string
    },
    comment: Comment[],
    author: Author,
    description: string,
    mainImage: {
        asset: {
            url: string
        }
    },
    body: [object]
}

export interface Author {
    _id: string,
    name: string,
    image: string
}

export interface Comment {
    comment: string,
    approved: boolean,
    email: string,
    name: string,
    post: {
        _ref: string,
        _type: string
    },
    _createdAt: string,
    _id: string,
    _rev: string,
    _type: string,
    _updatedAt: string
}