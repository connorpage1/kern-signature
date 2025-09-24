import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    } from "@chakra-ui/react";

    function SignatureInstructionsTabs() {
    return (
        <Tabs mt={15} isFitted variant="enclosed">
        <TabList mb="1em">
            <Tab>Outlook - Windows (New)</Tab>
            <Tab>Outlook - Windows (Old)</Tab>
            <Tab>Outlook - Mac</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
            <Text>
                1. Outlook → ⚙️ → Accounts → Signatures .<br />
                2. Click <strong>+</strong> to create a new signature.<br />
                3. Paste the signature.<br />
                4. Name and save it <br />
                5. Configure usage rules.<br />
            </Text>
            </TabPanel>
            <TabPanel>
            <Text>
                1. File → Options → Mail → <strong>Signatures</strong>.<br />
                2. Click <strong>New</strong>, name it, and paste your signature.<br />
                3. Assign it to your email account.
            </Text>
            </TabPanel>
            <TabPanel>
            <Text>
                1. Outlook → Settings → <strong>Signatures</strong>.<br />
                2. Click <strong>+</strong>, paste, and name.<br />
                3. Assign to your account if needed.
            </Text>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}

export default SignatureInstructionsTabs;
