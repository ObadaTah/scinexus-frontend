import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu, { menuClasses } from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Chip from "@mui/joy/Chip";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, Typography } from "@mui/joy";
import { Row, Col, Container } from "react-bootstrap";

// The Menu is built on top of Popper v2, so it accepts `modifiers` prop that will be passed to the Popper.
// https://popper.js.org/docs/v2/modifiers/offset/

const modifiers = [
    {
        name: "offset",
        options: {
            offset: ({ placement }) => {
                // if (placement.includes("end")) {
                //     return [0, 0];
                // }
                return [0, -8];
            },
        },
    },
];

export default function VarifiedChip(props) {
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Dropdown open={isDropdownVisible}>
                <MenuButton
                    style={{
                        borderWidth: 0,
                        borderStyle: "none",
                        padding: 0,
                        height: "20px",
                    }}
                >
                    <Menu modifiers={modifiers}>
                        {props.validatedBy.map((organization, index) => {
                            return (
                                <Container key={index}>
                                    <Link
                                        underline="none"
                                        variant="plain"
                                        textColor="black"
                                    >
                                        <Container>
                                            <Row>
                                                <Typography
                                                    level="h5"
                                                    fontWeight="lg"
                                                >
                                                    🏨 {organization.firstName}
                                                </Typography>
                                            </Row>

                                            <Row>
                                                <Typography
                                                    // variant="plain"
                                                    textColor="grey"
                                                    level="h6"
                                                >
                                                    {organization.fieldOfWork}
                                                </Typography>
                                            </Row>
                                        </Container>
                                    </Link>
                                </Container>
                            );
                        })}
                    </Menu>
                    <Chip
                        variant="solid"
                        color="success"
                        size="sm"
                        sx={{ pointerEvents: "none" }}
                    >
                        Verified Research Paper
                    </Chip>
                </MenuButton>
            </Dropdown>
        </div>
    );
}
