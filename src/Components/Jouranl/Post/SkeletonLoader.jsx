import { AspectRatio, Card, Skeleton, Typography, List } from "@mui/joy";

function SkeletonLoader(props) {
    const skeletonCards = Array.from({ length: 10 }).map((_, index) => (
        <Card
            key={index}
            variant="outlined"
            style={{ display: props.isLoading, marginBottom: "16px" }}
        >
            <AspectRatio ratio="21/9">
                <Skeleton variant="overlay">
                    <img
                        alt=""
                        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    />
                </Skeleton>
            </AspectRatio>
            <Typography>
                <Skeleton>
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries.
                </Skeleton>
            </Typography>
        </Card>
    ));

    return (
        <>
            <List style={{ display: props.isLoading }}>{skeletonCards}</List>
        </>
    );
}

export default SkeletonLoader;
