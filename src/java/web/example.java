/**
 * ESTE EJEMPLO SI SIRVE
 */
package web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;

/**
 *
 * @author Admin
 */
@WebServlet(name = "example", urlPatterns = {"/example"})
public class example extends HttpServlet {

    private ProcessBuilder pb;
    private Map<String, String> httpKV = new TreeMap<String, String>();
    private String aux;
    private String resulset;
    private String progressExe;
    private String WorckSpace;
    private String pfdata;
    private String SO;
    private String intError;

    public example() {
        this.resulset = "";
        Properties config = new Properties();
        try {
            config.load(new FileReader("C:/xampp/htdocs/WebApp/src/java/web/newproperties.properties"));

            //Evaluamos el SO en el que se esta trabajndo
            this.SO = config.getProperty("server");
            String exec;
            switch (getSO().toString()) {
                case "Linux":
                    exec = "/_progres -b";
                    break;
                case "Windows":
                    //C:\PROGRESS\bin\_progres.exe
                    exec = "\\_progres.exe";
                    break;
                default:
                    exec = " Error in Application server operating system value: " + getSO() + "check the configuration file ";
                    setIntError(exec);
                    break;
            }

            setProgressExe(config.getProperty("DLC") + exec);
            setWorckSpace(config.getProperty("PATHPROG"));
            setPfdata(config.getProperty("PROCGI"));

        } catch (IOException ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            ServletContext sc = this.getServletContext();
            RequestDispatcher rd = sc.getRequestDispatcher("/header.jsp");
            rd.include(request, response);
            /* TODO output your page here. You may use following sample code. */
            String req = request.getParameter("p");
            
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println(" <meta charset=\"utf-8\">");
            out.println("<title>Servlet example</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet example at " + request.getContextPath() + "</h1>");
            example pop = new example();

            pop.openrockjs(request, req);

            out.print(pop.getAux());

            out.println("</body>");
            out.println("</html>");

            ServletContext sc2 = this.getServletContext();
            RequestDispatcher rd2 = sc2.getRequestDispatcher("/footer.jsp");
            rd2.include(request, response);
        }
    }

    /**
     * @param request variables GET/POST
     * @param req nombre del p o r progress
     * @throws ServletException
     * @throws IOException
     */
    private void openrockjs(HttpServletRequest request, String p) throws ServletException, IOException {
        /**
         * 1: Creamos una arreglo en forma de lista que guardara los execos de
         * terminal necesarios para ejecutar RockJS
         */

//        System.out.println(getProgressExe());
//        System.out.println(getWorckSpace());
//        System.out.println(getPfdata());

        List<String> CMD = new ArrayList<>();
        CMD.add(getProgressExe());
        CMD.add("-pf");
        CMD.add(getPfdata());
        CMD.add("-p");
        CMD.add(getWorckSpace() + "\\" + p + ".p");
        
       

        /**
         * 2: creamos una instancia del onjeto ProcessBuilder que envia los
         * execos Terminal al SO y deviuelve la respuesta del mismo pb recibe
         * como parametro el arreglo CMD
         */
        pb = new ProcessBuilder(CMD);
        /**
         * 3: recorremos los elementos GET/POST/SERVER del HttpServletRequest
         * request Se guardan al arreglo listKV (key, value) posteriormente se
         * subiran a memoria
         */
        Enumeration e = request.getParameterNames();
        while (e.hasMoreElements()) {
            Object nexElement = e.nextElement();
            String k = nexElement.toString();
            String v = request.getParameter(k);
            this.httpKV.put(k, v);
        }
        /**
         * 4: Por cada HttpServletRequest en el arreglo se crean las variables
         * de ambiente que se cargaran a memoria
         */
        for (Map.Entry<String, String> entry : this.httpKV.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            //System.out.println("----environment-----");
            //System.out.println("key " + key + " value " + value);
            //Proceso de subida a memoria httpKV
            this.pb.environment().put(key, value);
        }
        /**
         * 5: se ejecuta el proceso de terminal al SO
         */
        Process popen = pb.start();
        //Obj p se añade a inputstream para su ectura
        InputStream is = popen.getInputStream();
        //is se agrega a un buffer para leer la salida
        BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        //Se lee la primera linea
        aux = br.readLine();
        //mientras haya lineas en Salida

        while (aux != null) {
            /*Se inicializa setresult*/
            this.resulset += aux;
            aux = br.readLine();
        }
    }

    private String getAux() {
        if (this.resulset == null) {
            return "";
        } else {
            return this.resulset;
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private String getProgressExe() {
        return progressExe;
    }

    private void setProgressExe(String progressExe) {
        this.progressExe = progressExe;
    }

    private String getWorckSpace() {
        return WorckSpace;
    }

    private void setWorckSpace(String WorckSpace) {
        this.WorckSpace = WorckSpace;
    }

    private String getPfdata() {
        return pfdata;
    }

    private void setPfdata(String pfdata) {
        this.pfdata = pfdata;
    }

    private String getSO() {
        return SO;
    }

    private String getIntError() {
        return intError;
    }

    private void setIntError(String intError) {
        this.intError += intError;
    }
    

}
