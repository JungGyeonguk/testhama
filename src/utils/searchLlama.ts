
import * as vscode from 'vscode';
import { getConfig } from "../config";
import { Ollama } from "langchain/llms/ollama";


export async function searchLlama(keyword: string): Promise<any> {

    const ollama = new Ollama({
        baseUrl: "http://localhost:11434", // Default value
        model: "codellama", // Default value
    });
    
    const stream = await ollama.stream(
        keyword
    );
    
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    
    console.log(chunks.join(""));
    

    const config = getConfig();



    //     // When promise resolved, show finished loading for 5 seconds
    //     vscode.window.setStatusBarMessage(`CaptainStack: Finished loading ${results.length} results`);
    // });

    // vscode.window.setStatusBarMessage(`CaptainStack: Start loading snippet results...`, promise);
    return [{
        code: chunks.join("")
    }];
}
