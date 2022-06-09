import { cilHamburgerMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import * as React from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { savePathname } from "../../utils/location";

const HelpComponent = () => {
  const { config } = React.useContext(SettingsContext);
  
  React.useEffect(() => {
    savePathname();
  }, []);

  return (
    <div className="row my-3">
      <div className="col-lg-12">
        <div className="card pb-4">
          <div className="card-header">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-10 my-auto">
                <CIcon icon={cilHamburgerMenu} />
                &nbsp;AYUDA
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="col-sm-12">
              <form className="row" onSubmit={() => {}}>
                <div className="col-12" />
              </form>
              <br />
              <div className="form-group text-center">
                <h2 className="text-black fw-bold">
                  ¿Tienes dudas de como usar el sistema?
                </h2>
                <h4 className="text-dark mt-2">
                  El manual te ofrece el paso a paso para continuar un flujo
                  correcto.
                </h4>

                {config?.manual ? (
                  <div className="form-group mt-3 d-block">
                    <label className="form-label fw-bold" htmlFor="download">
                      Descargar ahora:
                    </label>
                    &nbsp;&nbsp;
                    <a
                      href={config?.manual}
                      target="_blank"
                      className="btn btn-dark fw-bold form-control"
                      style={{ maxWidth: 200 }}
                      rel="noreferrer"
                    >
                      DESCARGAR
                    </a>
                  </div>
                ) : (
                  <p className="fs-3">Próximamente</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpComponent;
