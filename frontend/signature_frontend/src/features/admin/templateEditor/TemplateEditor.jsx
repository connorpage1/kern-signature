// features/admin/templateEditor/TemplateEditor.jsx
import React, { useState } from "react";
import { Box, Heading, VStack, Divider } from "@chakra-ui/react";
import TemplateForm from "./TemplateForm";
import FieldBuilder from "./FieldBuilder";
import FieldList from "./FieldList";
import FieldPreview from "./FieldPreview";

export default function TemplateEditor() {
    const [templateMeta, setTemplateMeta] = useState({ name: "", description: "" });
    const [fields, setFields] = useState([]);

    return (
        <Box maxW="1000px" mx="auto" p={8}>
        <Heading mb={4}>Template Editor</Heading>
        <VStack spacing={8} align="stretch">
            <TemplateForm meta={templateMeta} setMeta={setTemplateMeta} />
            <Divider />
            <FieldBuilder fields={fields} setFields={setFields} />
            <FieldList fields={fields} setFields={setFields} />
            <Divider />
            <FieldPreview fields={fields} />
        </VStack>
        </Box>
    );
}
