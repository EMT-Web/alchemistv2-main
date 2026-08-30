export interface Post {
    _id : string;
    _createdAt: string;
    title: string;
    featured: boolean;
    author: {
        name: string;
        image: string;
    };
    comments: Comment[];
    description : string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}

export interface Destination {
    _id : string;
    _createdAt: string;
    title: string;
    featured: boolean;
    author: {
        name: string;
        image: string;
    };
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
}
export interface Category {
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    slug: {
        current: string;
    };
}
export interface Comment {
    approved: boolean;
    name: string;
    comment: string;
    email: string;
    post:{
        _ref: string;
        _type: string;
    };
    _id : string;
    _createdAt: string;
    _rev: string;
    _type: string;
    updatedAt: string;
}


export declare global {
    interface Window {
        adsbygoogle: any;
    }
}