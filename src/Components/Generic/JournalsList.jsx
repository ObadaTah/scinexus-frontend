import { List, ListItem } from "@mui/material";
import Post from "../Jouranl/Post/Post";
import ResearchPaper from "../Jouranl/ResearchPaper/ResearchPaper";

function JournalsList() {
    // TBI : To be implemented
    const dummyOrgs = [
        { name: "Bethlehem University", image: "https://placehold.co/400x400" },
        { name: "Bethlehem University", image: "https://placehold.co/400x400" },
        { name: "Bethlehem University", image: "https://placehold.co/400x400" },
        { name: "Bethlehem University", image: "https://placehold.co/400x400" },
    ];
    const dummyCont = [
        { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
        { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
        { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
        { name: "Obada Tahboub", image: "https://placehold.co/400x400" },
    ];
    const dummyResearchPapers = [
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "https://placehold.co/400x400",
            contributors: dummyCont,
            content: {
                header: "Abstraction",
                paragraph: "This is a dummy research paper",
            },
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "https://placehold.co/400x400",
            contributors: dummyCont,
            content: {
                header: "Abstraction",
                paragraph: "This is a dummy research paper",
            },
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "https://placehold.co/400x400",
            contributors: dummyCont,
            content: {
                header: "Abstraction",
                paragraph: "This is a dummy research paper",
            },
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "https://placehold.co/400x400",
            contributors: dummyCont,
            content: {
                header: "Abstraction",
                paragraph: "This is a dummy research paper",
            },
        },
    ];
    const dummyPosts = [
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "https://placehold.co/400x400",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "https://placehold.co/3000x3000",
        },
    ];
    const onClick = () => {};
    return (
        <>
            <List>
                {dummyPosts.map((post, index) => {
                    return (
                        <ListItem key={index}>
                            <Post
                                publisher={post.publisher}
                                content={post.content}
                                publishDate={post.publishDate}
                                image={post.image}
                            />
                        </ListItem>
                    );
                })}
                {dummyResearchPapers.map((researchPaper, index) => {
                    return (
                        <ListItem key={index}>
                            <ResearchPaper
                                publisher={researchPaper.publisher}
                                title={researchPaper.title}
                                publishDate={researchPaper.publishDate}
                                organizations={researchPaper.organizations}
                                image={researchPaper.image}
                                content={researchPaper.content}
                                contributors={researchPaper.contributors}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

export default JournalsList;
