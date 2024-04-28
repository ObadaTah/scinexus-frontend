import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListSubheader from "@mui/joy/ListSubheader";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

export default function ColorInversionFooter() {
    const color = "danger";
    return (
        <Sheet
            variant="solid"
            color={color}
            invertedColors
            sx={{
                ...(color !== "neutral" && {
                    bgcolor: `${color}.800`,
                }),
                flexGrow: 1,
                p: 2,
                borderRadius: { xs: 0, sm: "sm" },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton variant="plain">
                    <FacebookRoundedIcon />
                </IconButton>
                <IconButton variant="plain">
                    <GitHubIcon />
                </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "flex-start" },
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <Card
                    variant="soft"
                    size="sm"
                    sx={{
                        flexDirection: { xs: "row", md: "column" },
                        minWidth: { xs: "100%", md: "auto" },
                        gap: 1,
                    }}
                >
                    <CardContent>
                        <Typography level="body-sm">SciNexus</Typography>
                    </CardContent>
                </Card>
                <List
                    size="sm"
                    orientation="horizontal"
                    wrap
                    sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
                >
                    <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
                        <ListSubheader sx={{ fontWeight: "xl" }}>
                            Sitemap
                        </ListSubheader>
                        <List>
                            <ListItem>
                                <Link to="/home">
                                    <ListItemButton>Home</ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to={"/myProfile"}>
                                    <ListItemButton>My Profile</ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link to={"/logout"}>
                                    <ListItemButton>Logout</ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </ListItem>
                    <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
                        <ListSubheader sx={{ fontWeight: "xl" }}>
                            Products
                        </ListSubheader>
                        <List>
                            <ListItem>
                                <ListItemButton>Link</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Base UI</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Material UI</ListItemButton>
                            </ListItem>
                        </List>
                    </ListItem>
                </List>
            </Box>
        </Sheet>
    );
}
