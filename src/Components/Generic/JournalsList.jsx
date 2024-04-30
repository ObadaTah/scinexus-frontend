import { List, ListItem } from "@mui/material";
import Post from "../Jouranl/Post/Post";
import ResearchPaper from "../Jouranl/ResearchPaper/ResearchPaper";

function JournalsList() {
    // TBI : To be implemented
    const dummyOrgs = [
        { name: "Bethlehem University", image: "src" },
        { name: "Bethlehem University", image: "src" },
        { name: "Bethlehem University", image: "src" },
        { name: "Bethlehem University", image: "src" },
    ];
    const dummyCont = [
        { name: "Obada Tahboub", image: "src" },
        { name: "Obada Tahboub", image: "src" },
        { name: "Obada Tahboub", image: "src" },
        { name: "Obada Tahboub", image: "src" },
    ];
    const dummyResearchPapers = [
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "src",
            contributors: dummyCont,
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "src",
            contributors: dummyCont,
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "src",
            contributors: dummyCont,
        },
        {
            publisher: "UserName",
            title: "This is a dummy research paper",
            publishDate: "2021-10-10",
            organizations: dummyOrgs,
            image: "src",
            contributors: dummyCont,
        },
    ];
    const dummyPosts = [
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "src",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "src",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "src",
        },
        {
            publisher: "UserName",
            content: "This is a dummy post",
            publishDate: "2021-10-10",
            image: "src",
        },
    ];
    const onClick = () => {};
    return (
        <>
            <List>
                {dummyPosts.map((post) => {
                    return (
                        <ListItem>
                            <Post
                                publisher={post.publisher}
                                content={post.content}
                                publishDate={post.publishDate}
                                image={post.image}
                            />
                        </ListItem>
                    );
                })}
                {dummyResearchPapers.map((researchPaper) => {
                    return (
                        <ListItem>
                            <ResearchPaper
                                publisher={researchPaper.publisher}
                                title={researchPaper.title}
                                publishDate={researchPaper.publishDate}
                                organizations={researchPaper.organizations}
                                image={researchPaper.image}
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
