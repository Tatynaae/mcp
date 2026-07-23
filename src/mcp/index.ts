import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { EmailService } from "../services/EmailService";
import { UserService } from "../services/UserService";

const emailService = new EmailService();
const userService = new UserService();

const server = new McpServer({
    name: "Demo Server",
    version: "1.0.0",
});

server.registerTool("send_message",
    {
        title: "Send Message",
        description: "Send a message to the user",
        inputSchema: {
            text: z.string(),
        }
    },
    async (req) => {
        await emailService.saveEmail(req.text);
        return {content: [{type: "text", text: "Message sent successfully"}],};
    }
);

server.registerTool("create_user",
    {
        title: "Create User",
        description: "Create a new user",
        inputSchema: {
            name: z.string(),
            birthYear: z.number(),
        }
    },
    async (req) => {
        await userService.addUser({
            name: req.name,
            birthYear: req.birthYear,
        });

        return {content: [{type: "text", text: `req.name created successfully`}],};
    }
);

server.registerTool("users_list",
    {
        title: "Get Users",
        description: "Get all users",
        outputSchema: z.array(
            z.object({
                name: z.string(),
                birthYear: z.string(),
            })
        )
    },
    async () => {
        let elements = await userService.getUsers();
        return {
            structuredContent: {
                elements: elements,
            },
            content: [
                {
                    type: "text",
                    text: elements.map((user) => `${user.name} - ${user.birthYear}`).join(", ") || "No users found",
                }
            ],
        }
    }
);

server.registerTool("users_count",
    {
        title: "Get Users Count",
        description: "Get the number of users",
        inputSchema: {  
            age: z.number().optional().default(0),  
        }, 
    },
    async (req) => {
        const users = await userService.countUsersOlderThan(req.age);
        return {
            content: [{type: "text", text: String(users)}],
        }
    }
);

const transport = new StdioServerTransport();

async function main(): Promise<void> {
    await server.connect(transport);
}

void main();