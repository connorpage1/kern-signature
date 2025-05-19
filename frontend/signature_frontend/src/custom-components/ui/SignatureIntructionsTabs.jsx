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
        <Tabs mt={8} isFitted variant="enclosed">
        <TabList mb="1em">
            <Tab>Outlook - Windows (New)</Tab>
            <Tab>Outlook - Windows (Old)</Tab>
            <Tab>Outlook - Mac</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
            <Text>
                1. Outlook → ⚙️ → <strong>View all Outlook settings</strong>.<br />
                2. Mail &gt; <strong>Compose and reply</strong>.<br />
                3. Paste the signature.<br />
                4. Configure usage rules.<br />
                5. <strong>Save</strong>.
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
                1. Preferences → <strong>Signatures</strong>.<br />
                2. Click <strong>+</strong>, paste and name.<br />
                3. Assign to your account if needed.
            </Text>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}

export default SignatureInstructionsTabs;
