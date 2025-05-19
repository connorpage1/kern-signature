import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    } from "@chakra-ui/react";

    export default function PhoneInputField({ label, ...props }) {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();
    const [raw, setRaw] = useState("");

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 10);
        let result = "";

        if (digits.length > 0) result += "(" + digits.slice(0, 3);
        if (digits.length >= 4) result += ") " + digits.slice(3, 6);
        if (digits.length >= 7) result += "-" + digits.slice(6, 10);

        return result;
    };

    const handleChange = (e) => {
        const input = e.target.value;
        const digits = input.replace(/\D/g, "");
        setRaw(digits);
        setFieldValue(field.name, formatPhone(digits));
    };

    const buildDisplay = () => {
        const placeholder = "(___) ___-____";
        const formatted = formatPhone(raw);
        return formatted + placeholder.slice(formatted.length);
    };

    return (
        <FormControl isInvalid={!!(meta.touched && meta.error)} mb={4}>
        <FormLabel>{label}</FormLabel>
        <Box position="relative">
            <Input
            value={formatPhone(raw)}
            onChange={handleChange}
            onBlur={field.onBlur}
            name={field.name}
            placeholder=""
            variant="flushed"
            focusBorderColor="purple.500"
            zIndex={1}
            position="relative"
            />
            <Input
            value={buildDisplay()}
            isReadOnly
            pointerEvents="none"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            color="gray.300"
            background="transparent"
            border="none"
            variant="flushed"
            zIndex={0}
            />
        </Box>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}

