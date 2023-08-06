const PATH = "/notes/dev-tools";

export default [
    {
        text: "多版本运行时管理",
        collapsed: true,
        items: [{ text: "asdf", link: `${PATH}/asdf/` }],
    },
    {
        text: "协作开发版本控制",
        collapsed: true,
        items: [{ text: "Git", link: `${PATH}/git/` }],
    },
    {
        text: "容器化平台",
        collapsed: true,
        items: [
            { text: "Docker", link: `${PATH}/docker/` },
            { text: "Kubernetes", link: `${PATH}/kubernetes/` },
        ],
    },
];
