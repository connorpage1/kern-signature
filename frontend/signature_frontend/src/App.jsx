// ... keep all your existing imports
import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Card,
  CardBody,
  Box,
  VStack,
  Button,
  Checkbox,
  Select,
  SimpleGrid,
  Heading,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import PhoneInputField from "./custom-components/fields/PhoneInputField";
import "./App.css";
import toast from "react-hot-toast";
import SignatureInstructionsTabs from "./custom-components/ui/SignatureIntructionsTabs";
import * as Yup from "yup";
import { BsCopy } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import { MdOutlineDownloadDone } from "react-icons/md";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  title: Yup.string().required("Title is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  phone_mobile: Yup.string().required("Mobile phone is required."),
});

function App() {
  const [html, setHtml] = useState("");
  const [showOffice, setShowOffice] = useState(false);
  const [showFax, setShowFax] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [copyClicked, setCopyClicked] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [signatureGenerated, setSignatureGenerated] = useState(false);
  const [copyDisabled, setCopyDisabled] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setFormValues(values);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    setHtml(data.html);
    resetForm();
    setSignatureGenerated(true)
  };

  const handleCopy = () => {
    if (!html) return;
    navigator.clipboard
      .write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
        }),
      ])
      .then(() => {
        toast.success("Signature copied");
        setCopyClicked(true);
        setCopyDisabled(true);


        setTimeout(() => {
          setCopyClicked(false);
          setCopyDisabled(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Clipboard error", err);
        toast.error("Failed to copy signature");
      });
  };

  const handleDownload = () => {
    if (!html) return;
    const safeName = formValues.name ? formValues.name.trim().replace(/\s+/g, "_") : "User";
    const blob = new Blob([html], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName}_Kern_Signature.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setDownloadClicked(true);
  };

  return (
    <div className="container">
      <Box px={10} pt={6} maxW="1000px" mx="auto">
        <Text fontSize="sm" fontWeight="bold" color="brand.500" mb={2}>
          Kern Signature Generator
        </Text>
        <Heading as="h1">Email Signature Generator</Heading>
        <Text mt={2}>
          Fill out the form, click "Generate Signature," and follow the instructions to paste your
          signature into Outlook.
        </Text>

        <Formik
          initialValues={{
            name: "",
            title: "",
            email: "",
            phone_office: "",
            phone_fax: "",
            phone_mobile: "",
            company: "kern",
            showOfficeFax: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ values, setFieldValue }) => 
              !signatureGenerated ? (
                <Form noValidate>
                  <VStack spacing={6} align="stretch" mt={6}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                            isRequired
                          >
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input {...field} id="name" placeholder="Full Name" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
    
                      <Field name="title">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.title && form.touched.title}
                            isRequired
                          >
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input {...field} id="title" placeholder="Title" />
                            <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
    
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                            isRequired
                          >
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input {...field} id="email" placeholder="name@example.com" />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
    
                      <PhoneInputField label="Mobile Phone" name="phone_mobile" isRequired />
                    </SimpleGrid>
    
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <VStack align="stretch" spacing={4}>
                        <FormControl>
                          <Checkbox
                            isChecked={showOffice}
                            onChange={() => setShowOffice(!showOffice)}
                          >
                            Show Office Phone
                          </Checkbox>
                        </FormControl>
                        {showOffice && (
                          <PhoneInputField label="Office Phone" name="phone_office" />
                        )}
                      </VStack>
    
                      <VStack align="stretch" spacing={4}>
                        <FormControl>
                          <Checkbox
                            isChecked={showFax}
                            onChange={() => setShowFax(!showFax)}
                          >
                            Show Fax
                          </Checkbox>
                        </FormControl>
                        {showFax && <PhoneInputField label="Fax" name="phone_fax" />}
                      </VStack>
                    </SimpleGrid>
    
                    <Field name="company">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="company">Company for Social Links</FormLabel>
                          <Select {...field} id="company">
                            <option value="kern">Kern Studios</option>
                            <option value="mgw">Mardi Gras World</option>
                            <option value="rivercity">River City Venues</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
    
                    <Button type="submit" colorScheme="brand" width="full">
                      Generate Signature
                    </Button>
                  </VStack>
                </Form>
                ) : (

              <>
                <Card className='signature-preview' mt={6} boxShadow="md" border="1px solid" borderColor="gray.200">
                  <CardBody>
                    <Box dangerouslySetInnerHTML={{ __html: html }} />
                  </CardBody>
                </Card>
      
                <HStack spacing={4} mt={4}>
                  <Button
                    onClick={handleCopy}
                    colorScheme={copyClicked ? "brand" : "gray"}
                    variant="solid"
                    isDisabled={copyDisabled}
                    leftIcon={copyClicked ? <IoMdCheckmark /> : <BsCopy />}
                  >
                    {copyClicked ? "Copied" : "Copy Signature"}
                  </Button>
                  <Button
                    onClick={handleDownload}
                    colorScheme={downloadClicked ? "brand" : "gray"}
                    variant="solid"
                    isDisabled={downloadClicked}
                    leftIcon={downloadClicked ? <MdOutlineDownloadDone /> : <HiDownload />}
                  >
                    {downloadClicked ? "Downloaded" : "Download HTML"}
                  </Button>
                  <Button
                      onClick={() => {
                        setSignatureGenerated(false);
                        setHtml(""); // optional
                      }}
                      colorScheme="brand"
                      variant="outline"
                      _hover={{
                          bg: "brand.600",
                          color: "white",
                          borderColor: "purple.500",
                        }}
                    >
                      Generate Another Signature
                  </Button>
                </HStack>
                <Box mt={6}>
                  <Heading as='h3'>Instructions: Setting your signature in Outlook</Heading>
                  <Text mt={2}>For best results, especially on MacOS, use the built-in copy button to copy your newly generated email signature.</Text>
                </Box>
                <Box mt={6}>
                  <SignatureInstructionsTabs />
                </Box>
              </>
          )}
        </Formik>

      </Box>
    </div>
  );
}

export default App;
