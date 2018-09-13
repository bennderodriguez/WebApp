/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package web;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Admin
 */
public class main {
    public static void main(String[] args) throws FileNotFoundException {
        Properties config = new Properties();
        File miDir = new File (".");
        try {
            System.out.println ("Directorio actual: " + miDir.getCanonicalPath());
            //config.load(new FileReader(miDir.getCanonicalPath()+"/web/newproperties.properties"));
            config.load(new FileReader("C:/xampp/htdocs/WebApp/src/java/web/newproperties.properties"));
            
            System.out.println("DLC " + config.getProperty("DLC"));
            System.out.println("PATHPROG " + config.getProperty("PATHPROG"));
            System.out.println("PROCGI " + config.getProperty("PROCGI"));
        } catch (IOException ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
